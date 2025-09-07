// Form Placeholder Data Configuration
const formPlaceholders = {
  // Input field placeholders
  companyName: 'Your Company Inc.',
  botName: 'Support Bot',
  guidelines: 'Define how the AI should behave and respond...',
  guardrails: 'Specify what the AI should not do or say...',

  // Feature context placeholders
  newFeatureName: 'Feature name...',
  newFeatureDescription: 'Feature description...',

  // Select field placeholders
  selectedFeature: 'Choose a feature to test',
  ageRangeMin: 'Min age',
  ageRangeMax: 'Max age',
  location: 'Select target location',

  // Default form values
  defaultValues: {
    companyName: '',
    botName: 'AI Assistant',
    guidelines:
      'Your primary goal is to help customers with their inquiries efficiently and with a friendly, professional tone. Always be empathetic and clear in your communication.',
    guardrails:
      'Never make up information. Do not discuss sensitive personal data unless required for verification. Avoid using slang or overly casual language. If you cannot answer a question, offer to escalate to a human configuration.',
    selectedFeature: '',
    ageRangeMin: '',
    ageRangeMax: '',
    location: '',
    channels: []
  },

  // Predefined feature contexts
  defaultFeatureContexts: [
    {
      id: 'checkout',
      name: 'Checkout Optimization',
      description:
        'Testing improvements to the checkout flow and payment process'
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
  ],

  // Channel options
  channels: ['web'],

  location: ['Global'],

  // Age options
  ageOptions: [
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
  ],

  // Form descriptions and labels
  descriptions: {
    companyName:
      'This name is used to identify your company to the user (e.g., "Welcome to [Company Name]...").',
    guardrails:
      'Set clear boundaries. What topics are off-limits? What actions should it never perform?',
    guidelines:
      'Describe the desired tone, style, and approach for customer interactions.',
    featureContext:
      'Select the specific feature context for testing. Only one feature should be selected.',
    targetAudience:
      'Define the specific audience demographics and channels for this configuration.',
    channels: 'Select the channels where this configuration will be used.'
  },

  // Toast messages
  messages: {
    successTitle: 'Configuration Saved!',
    successDescription:
      'Your AI voice configuration has been updated successfully.'
  }
};

export default formPlaceholders;
