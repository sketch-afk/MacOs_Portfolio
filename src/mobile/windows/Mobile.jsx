import React from 'react'
import { Monitor } from 'lucide-react'

// Note: You only need this breakpoint here if you plan to do the window measurement 
// inside this file instead of using the useIsMobile hook!
const MOBILE_BREAKPOINT = 768

const Mobile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-[100dvw] bg-gray-50 dark:bg-black p-6 font-sans selection:bg-blue-500/30">
      
      {/* Icon Container with a subtle Apple-style app icon shape */}
      <div className="w-24 h-24 mb-8 bg-white dark:bg-gray-900 rounded-[2rem] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-100 dark:border-white/5">
        <Monitor className="w-10 h-10 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
      </div>

      {/* Typography */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white text-center tracking-tight">
        Desktop Experience
      </h1>
      
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-[320px] text-[15px] leading-relaxed">
        This portfolio is designed as a full macOS desktop environment. 
        For the best experience, please open this link on a desktop or laptop computer or switch to desktop view.
      </p>

    </div>
  )
}

export default Mobile

