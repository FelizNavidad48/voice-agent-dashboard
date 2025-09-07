'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useState } from 'react';
import {
  Plus,
  X,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  MapPin,
  Bot,
  Shield,
  Settings,
  Users,
  Target
} from 'lucide-react';
import formPlaceholders from '../data';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define feature context type
interface FeatureContext {
  id: string;
  name: string;
  description: string;
}

// Enhanced schema with new fields
const agentFormSchema = z.object({
  companyName: z.string().min(2, {
    message: 'Company name must be at least 2 characters.'
  }),
  botName: z.string().min(2, {
    message: 'Bot name must be at least 2 characters.'
  }),
  guidelines: z
    .string()
    .min(20, {
      message: 'Guidelines must be at least 20 characters.'
    })
    .max(1500, {
      message: 'Guidelines must not be longer than 1500 characters.'
    }),
  guardrails: z
    .string()
    .min(20, {
      message: 'Guardrails must be at least 20 characters.'
    })
    .max(1500, {
      message: 'Guardrails must not be longer than 1500 characters.'
    }),
  selectedFeature: z.string().min(1, {
    message: 'Please select a feature context.'
  }),
  ageRangeMin: z.string().min(1, {
    message: 'Please select minimum age.'
  }),
  ageRangeMax: z.string().min(1, {
    message: 'Please select maximum age.'
  }),
  location: z.string().min(1, {
    message: 'Please select a location.'
  }),
  channels: z.array(z.string()).min(1, {
    message: 'Please select at least one channel.'
  })
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

const defaultValues: Partial<AgentFormValues> = {
  companyName: formPlaceholders.companyName,
  botName: formPlaceholders.botName,
  guidelines:
    'Your primary goal is to help customers with their inquiries efficiently and with a friendly, professional tone. Always be empathetic and clear in your communication.',
  guardrails:
    'Never make up information. Do not discuss sensitive personal data unless required for verification. Avoid using slang or overly casual language. If you cannot answer a question, offer to escalate to a human configuration.',
  selectedFeature: '',
  ageRangeMin: '',
  ageRangeMax: '',
  location: '',
  channels: []
};

// Predefined feature contexts
const defaultFeatureContexts: FeatureContext[] = [
  {
    id: 'checkout',
    name: 'Checkout Optimization',
    description: 'Testing improvements to the checkout flow and payment process'
  },
  {
    id: 'onboarding',
    name: 'User Onboarding',
    description: 'New user registration and initial setup experience'
  },
  {
    id: 'recommendation',
    name: 'Product Recommendations',
    description: 'AI-powered product suggestion engine'
  }
];

// Channel options
const channelOptions = [
  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
  { id: 'web', label: 'Web Browser', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet }
];

// Location options
const locationOptions = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East & Africa',
  'Global'
];

// Age options
const ageOptions = [
  '13',
  '16',
  '18',
  '21',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
  '65+'
];

export function AgentConfigurationForm() {
  const [featureContexts, setFeatureContexts] = useState<FeatureContext[]>(
    defaultFeatureContexts
  );
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  const [showAddFeature, setShowAddFeature] = useState(false);

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  const selectedChannels = form.watch('channels') || [];

  function onSubmit(data: AgentFormValues) {
    console.log(data);
    toast.success('Configuration Saved!', {
      description: 'Your AI voice configuration has been updated successfully.'
    });
  }

  const addFeatureContext = () => {
    if (newFeatureName.trim() && newFeatureDescription.trim()) {
      const newFeature: FeatureContext = {
        id: `custom-${Date.now()}`,
        name: newFeatureName.trim(),
        description: newFeatureDescription.trim()
      };
      setFeatureContexts([...featureContexts, newFeature]);
      setNewFeatureName('');
      setNewFeatureDescription('');
      setShowAddFeature(false);
    }
  };

  const removeFeatureContext = (id: string) => {
    if (!defaultFeatureContexts.find((f) => f.id === id)) {
      setFeatureContexts(featureContexts.filter((f) => f.id !== id));
    }
  };

  const toggleChannel = (channelId: string) => {
    const current = selectedChannels;
    const updated = current.includes(channelId)
      ? current.filter((id) => id !== channelId)
      : [...current, channelId];
    form.setValue('channels', updated);
  };

  return (
    <div className='bg-background min-h-screen'>
      <div className='max-w-8xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Agent Configuration
            </h1>
            <p className='text-muted-foreground'>
              Configure your AI agent's behavior and deployment settings
            </p>
          </div>
          {/*<Badge variant="outline" className="text-sm">*/}
          {/*    <Settings className="w-4 h-4 mr-2" />*/}
          {/*    Configuration*/}
          {/*</Badge>*/}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Basic Information Cards */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/*<Card>*/}
              {/*    <CardHeader>*/}
              {/*        <CardTitle className="flex items-center">*/}
              {/*            <Bot className="h-5 w-5 mr-2" />*/}
              {/*            Basic Information*/}
              {/*        </CardTitle>*/}
              {/*        <CardDescription>Configure agent identity and naming</CardDescription>*/}
              {/*    </CardHeader>*/}
              {/*    <CardContent className="space-y-6">*/}
              {/*        <FormField*/}
              {/*            control={form.control}*/}
              {/*            name='companyName'*/}
              {/*            render={({ field }) => (*/}
              {/*                <FormItem>*/}
              {/*                    <FormLabel>Company Name</FormLabel>*/}
              {/*                    <FormControl>*/}
              {/*                        <Input placeholder='Your Company Inc.' {...field} />*/}
              {/*                    </FormControl>*/}
              {/*                    <FormDescription>*/}
              {/*                        This name is used to identify your company to the user*/}
              {/*                    </FormDescription>*/}
              {/*                    <FormMessage />*/}
              {/*                </FormItem>*/}
              {/*            )}*/}
              {/*        />*/}

              {/*        <FormField*/}
              {/*            control={form.control}*/}
              {/*            name='botName'*/}
              {/*            render={({ field }) => (*/}
              {/*                <FormItem>*/}
              {/*                    <FormLabel>Bot Name</FormLabel>*/}
              {/*                    <FormControl>*/}
              {/*                        <Input placeholder='Support Bot' {...field} />*/}
              {/*                    </FormControl>*/}
              {/*                    <FormDescription>*/}
              {/*                        The name your customers will interact with*/}
              {/*                    </FormDescription>*/}
              {/*                    <FormMessage />*/}
              {/*                </FormItem>*/}
              {/*            )}*/}
              {/*        />*/}
              {/*    </CardContent>*/}
              {/*</Card>*/}

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Shield className='mr-2 h-5 w-5' />
                    Safety & Behavior
                  </CardTitle>
                  <CardDescription>
                    Set boundaries and behavioral guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name='guardrails'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Guardrails (Limitations & Topics to Avoid)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Specify what the AI should not do or say...'
                            className='min-h-[100px] resize-y'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Set clear boundaries and topics that are off-limits
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Target className='mr-2 h-5 w-5' />
                      Feature Context
                    </div>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => setShowAddFeature(true)}
                    >
                      <Plus className='mr-2 h-4 w-4' />
                      Add Feature
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Select the specific feature context for testing
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Add New Feature Form */}
                  {showAddFeature && (
                    <div className='space-y-3 rounded-lg border bg-gray-50 p-4'>
                      <div className='flex items-center justify-between'>
                        <h4 className='font-medium'>Add New Feature Context</h4>
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          onClick={() => setShowAddFeature(false)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                      <Input
                        placeholder='Feature name...'
                        value={newFeatureName}
                        onChange={(e) => setNewFeatureName(e.target.value)}
                      />
                      <Textarea
                        placeholder='Feature description...'
                        value={newFeatureDescription}
                        onChange={(e) =>
                          setNewFeatureDescription(e.target.value)
                        }
                        rows={2}
                      />
                      <Button
                        type='button'
                        onClick={addFeatureContext}
                        size='sm'
                        disabled={
                          !newFeatureName.trim() ||
                          !newFeatureDescription.trim()
                        }
                      >
                        Add Feature
                      </Button>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name='selectedFeature'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Feature Context</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Choose a feature to test'>
                                {field.value &&
                                  featureContexts.find(
                                    (f) => f.id === field.value
                                  )?.name}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {featureContexts.map((feature) => (
                              <SelectItem key={feature.id} value={feature.id}>
                                <div className='flex w-full items-center justify-between'>
                                  <div>
                                    <div className='font-medium'>
                                      {feature.name}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                      {feature.description}
                                    </div>
                                  </div>
                                  {!defaultFeatureContexts.find(
                                    (f) => f.id === feature.id
                                  ) && (
                                    <Button
                                      type='button'
                                      variant='ghost'
                                      size='sm'
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeFeatureContext(feature.id);
                                      }}
                                    >
                                      <X className='h-3 w-3' />
                                    </Button>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Feature Context and Target Audience */}
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Users className='mr-2 h-5 w-5' />
                    Target Audience
                  </CardTitle>
                  <CardDescription>
                    Define demographics and deployment channels
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {/* Age Range */}
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='ageRangeMin'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Age</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Min age' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ageOptions.map((age) => (
                                <SelectItem key={age} value={age}>
                                  {age}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='ageRangeMax'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Age</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Max age' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ageOptions.map((age) => (
                                <SelectItem key={age} value={age}>
                                  {age}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Geographic Location */}
                  <FormField
                    control={form.control}
                    name='location'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center'>
                          <MapPin className='mr-2 h-4 w-4' />
                          Geographic Location
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select target location' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locationOptions.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Globe className='mr-2 h-5 w-5' />
                    Deployment Channels
                  </CardTitle>
                  <CardDescription>
                    Select the channels where this configuration will be used
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name='channels'
                    render={() => (
                      <FormItem>
                        <FormLabel>Available Channels</FormLabel>
                        <div className='mt-2 flex flex-wrap gap-3'>
                          {channelOptions.map((channel) => {
                            const IconComponent = channel.icon;
                            const isSelected = selectedChannels.includes(
                              channel.id
                            );
                            return (
                              <Button
                                key={channel.id}
                                type='button'
                                variant={isSelected ? 'default' : 'outline'}
                                onClick={() => toggleChannel(channel.id)}
                                className='flex items-center space-x-2'
                              >
                                <IconComponent className='h-4 w-4' />
                                <span>{channel.label}</span>
                              </Button>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Channels Section */}

            {/* Submit Button */}
            <div className='flex justify-end'>
              <Button type='submit' size='lg' className='px-8'>
                Save Configuration
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
