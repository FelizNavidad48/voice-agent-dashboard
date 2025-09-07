import ConversationsViewPage from '@/features/conversations/components/conversations-view-page';
import PageContainer from '@/components/layout/page-container';
import StickyChat from '@/components/stickyChat';

export default function page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <ConversationsViewPage />
        <StickyChat />
      </div>
    </PageContainer>
  );
}
