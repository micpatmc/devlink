import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { getUser, useGetUser } from '@/hooks/users';
import Loading from '@components/common/Loading';
import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import * as models from '@/hooks/models';
import {
  QueryClient,
  QueryClientProvider,
  QueryObserverResult,
  RefetchOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useFBUser } from './FBUserContext';

interface DLUserContextProps {
  user: models.User;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<models.User | null, Error>>;
}

const DLUserContext = createContext<DLUserContextProps | undefined>(undefined);

export const DLUserProvider = ({ children }: { children: ReactNode }) => {
  const { fbuser } = useFBUser();
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {
    data: user,
    isFetching,
    isLoading,
    isPending,
    refetch,
  } = useGetUser(fbuser, fbuser.uid);

  useEffect(() => {
    setLoading(isLoading || isPending || isFetching);
  }, [isFetching, isLoading, isPending]);

  if (loading) {
    return <Loading />;
  } else if (!user) {
    router.push('/create-profile');
    return <Loading />;
  }

  return (
    <DLUserContext.Provider value={{ user, refetch }}>
      {children}
    </DLUserContext.Provider>
  );
};

export const useDLUser = () => {
  const context = useContext(DLUserContext);
  if (!context) {
    throw new Error(
      'useDLUser must be used within a DLUserProvider - ask arun'
    );
  }
  return context;
};
