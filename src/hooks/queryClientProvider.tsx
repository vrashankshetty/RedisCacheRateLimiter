'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient();

export const QueryClientProviderContext = ({
  children,
}: {
  children: React.ReactNode;
}) =>{
  return(
    <QueryClientProvider client={queryClient}>
       {children}  
    </QueryClientProvider>
  )
}