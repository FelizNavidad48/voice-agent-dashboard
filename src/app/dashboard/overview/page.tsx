import PageContainer from '@/components/layout/page-container';
import React from 'react';
import CustomerInsightsDashboard from '@/features/overview/components/overview';

export default function OverViewLayout() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        {/*<div className='flex items-center justify-between space-y-2'>*/}
        {/*  <h2 className='text-2xl font-bold tracking-tight'>*/}
        {/*    Hi, Welcome back 👋*/}
        {/*  </h2>*/}
        {/*</div>*/}

        <CustomerInsightsDashboard />
      </div>
    </PageContainer>
  );
}
