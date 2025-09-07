'use client';

import { useState } from 'react';
import {
  Bot,
  Users,
  Settings,
  MessageSquare,
  Globe,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Languages
} from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';

// Language options
const languageOptions = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Dutch',
  'Russian',
  'Chinese (Mandarin)',
  'Japanese',
  'Korean',
  'Arabic'
];

// Interview type options
const interviewTypes = [
  'NPS follow up',
  'Churn',
  'Feature Feedback',
  'Renewal',
  'Onboarding',
  'Product Discovery'
];

// Feature focus options
const featureOptions = [
  'Checkout Process',
  'User Onboarding',
  'Product Recommendations',
  'Customer Support',
  'Account Management',
  'Payment Processing',
  'Search Functionality',
  'Mobile Experience',
  'Dashboard Features',
  'Reporting Tools'
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
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+'
];

// Device type options
const deviceOptions = [
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet }
];

export default function AgentConfigurationForm() {
  const [formData, setFormData] = useState({
    agentTitle: '',
    language: '',
    featureFocus: '',
    targetAge: '',
    location: '',
    deviceType: '',
    openingMessage: '',
    interviewType: '',
    thankYouMessage: ''
  });

  const [selectedDevices, setSelectedDevices] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDevice = (deviceId) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSave = () => {
    console.log('Form data:', formData);
    console.log('Selected devices:', selectedDevices);
    // Form submission logic would go here
  };

  return (
    <div className='bg-background min-h-screen'>
      <div className='mx-auto max-w-4xl space-y-8'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Agent Configuration
          </h1>
          <p className='text-muted-foreground'>
            Configure your AI agent's behavior and deployment settings
          </p>
        </div>

        {/* Basic Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex'>
              <Bot className='mr-2 h-5 w-5' />
              Basic Information
            </CardTitle>
            <CardDescription>
              Set up your agent's identity and primary language
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Agent Title */}
            <div className='space-y-2'>
              <Label htmlFor='agentTitle'>Title of Agent</Label>
              <Input
                id='agentTitle'
                placeholder='e.g., Customer Feedback Assistant'
                value={formData.agentTitle}
                onChange={(e) =>
                  handleInputChange('agentTitle', e.target.value)
                }
              />
            </div>

            {/* Language Selection */}
            <div className='space-y-2'>
              <Label className='flex items-center'>
                <Languages className='mr-2 h-4 w-4' />
                Agent Language
              </Label>
              <Select
                value={formData.language}
                onValueChange={(value) => handleInputChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select the language your agent should speak' />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Users className='mr-2 h-5 w-5' />
              Define Your Target Audience
            </CardTitle>
            <CardDescription>
              Specify the focus area and demographics for your agent
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Feature Focus */}
            <div className='space-y-2'>
              <Label>Feature Focus</Label>
              <Select
                value={formData.featureFocus}
                onValueChange={(value) =>
                  handleInputChange('featureFocus', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select the feature your agent should focus on' />
                </SelectTrigger>
                <SelectContent>
                  {featureOptions.map((feature) => (
                    <SelectItem key={feature} value={feature}>
                      {feature}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Age Range */}
            <div className='space-y-2'>
              <Label>Target Age Group</Label>
              <Select
                value={formData.targetAge}
                onValueChange={(value) => handleInputChange('targetAge', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select target age range' />
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className='space-y-2'>
              <Label className='flex items-center'>
                <MapPin className='mr-2 h-4 w-4' />
                Geographic Location
              </Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleInputChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select target location' />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Device Types */}
            <div className='space-y-2'>
              <Label>Device Type</Label>
              <div className='flex flex-wrap gap-3'>
                {deviceOptions.map((device) => {
                  const IconComponent = device.icon;
                  const isSelected = selectedDevices.includes(device.id);
                  return (
                    <Button
                      key={device.id}
                      type='button'
                      variant={isSelected ? 'default' : 'outline'}
                      onClick={() => toggleDevice(device.id)}
                      className='flex items-center space-x-2'
                    >
                      <IconComponent className='h-4 w-4' />
                      <span>{device.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Settings className='mr-2 h-5 w-5' />
              Agent Settings
            </CardTitle>
            <CardDescription>
              Configure your agent's conversation flow and messaging
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Opening Message */}
            <div className='space-y-2'>
              <Label htmlFor='openingMessage'>Opening Message</Label>
              <Textarea
                id='openingMessage'
                placeholder='Hi! I&#39;m here to help you share your feedback about our product. This should only take a few minutes of your time.'
                value={formData.openingMessage}
                onChange={(e) =>
                  handleInputChange('openingMessage', e.target.value)
                }
                className='min-h-[100px] resize-y'
              />
            </div>

            {/* Interview Type */}
            <div className='space-y-2'>
              <Label className='flex items-center'>
                <MessageSquare className='mr-2 h-4 w-4' />
                Interview Type
              </Label>
              <Select
                value={formData.interviewType}
                onValueChange={(value) =>
                  handleInputChange('interviewType', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select the type of interview' />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Thank You Message */}
            <div className='space-y-2'>
              <Label htmlFor='thankYouMessage'>Thank You Message</Label>
              <Textarea
                id='thankYouMessage'
                placeholder='Thank you for taking the time to share your feedback! Your input helps us improve our product for everyone.'
                value={formData.thankYouMessage}
                onChange={(e) =>
                  handleInputChange('thankYouMessage', e.target.value)
                }
                className='min-h-[100px] resize-y'
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div>
          <Button onClick={handleSave} size='lg' className='px-12 py-3 text-lg'>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
