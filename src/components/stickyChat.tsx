'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StickyChat = () => {
  const [text, setText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Handle message submission here
    console.log('Message sent:', text);
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (isMinimized) {
    return (
      <div className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform'>
        <button
          onClick={() => setIsMinimized(false)}
          className='rounded-full bg-gray-800/80 p-3 text-white shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-gray-700/80'
        >
          <Send size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className='fixed bottom-6 left-1/2 z-50 w-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 transform'>
      <div className='shadow-3xl shadow-border border-gray overflow-hidden rounded-full border border-1 backdrop-blur-2xl'>
        <div className='p-4'>
          <form onSubmit={handleSubmit} className='relative'>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Type your message...'
              className='max-h-32 min-h-[44px] w-full resize-none rounded-lg border-none bg-transparent px-4 py-3 pr-12 text-sm font-medium text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all duration-200 focus:bg-transparent focus:outline-none'
              rows='1'
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(156,163,175,0.4) transparent'
              }}
            />
            <Button
              type='submit'
              disabled={!text.trim()}
              className='absolute top-1/2 right-2 -translate-y-1/2 transform rounded-xl border-none bg-gray-800/80 p-2.5 text-white backdrop-blur-sm transition-all duration-200 hover:bg-gray-700/90 disabled:bg-gray-400/50 disabled:text-gray-500'
            >
              <Send
                size={16}
                className={`transition-transform duration-200 ${text.trim() ? 'hover:translate-x-0.5' : ''}`}
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StickyChat;
