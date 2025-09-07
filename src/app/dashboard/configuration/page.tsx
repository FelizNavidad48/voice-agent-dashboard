import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import AgentConfigurationForm from '@/features/configuration/components/agent-configuration-form';

export const metadata = {
  title: 'Dashboard: Agent Configuration'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4 p-4 pt-6 md:p-6'>
        {/*<Heading*/}
        {/*    title='Agent Configuration'*/}
        {/*    description='Customize the behavior and personality of your AI voice agent.'*/}
        {/*/>*/}
        {/*<Separator />*/}
        <div className='max-w-8xl flex w-full items-start'>
          <AgentConfigurationForm />
        </div>
      </div>
    </PageContainer>
  );
}
