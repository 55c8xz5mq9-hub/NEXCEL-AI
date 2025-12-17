"use client";

import { motion } from "framer-motion";

// NEXCEL CORE - 3D Isometric Visualization - Autonomous Control System
export function CoreVisual() {
  const uniqueId = `core-3d-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ filter: "drop-shadow(0 0 30px rgba(0, 225, 255, 0.5)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.4))" }}
    >
      <defs>
        {/* 3D Box Gradients */}
        <linearGradient id={`${uniqueId}-box-top`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.7)" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${uniqueId}-box-side`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 225, 255, 0.6)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${uniqueId}-box-front`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.5)" stopOpacity="0.5" />
        </linearGradient>
        
        {/* Core Central Box - Special Gradient */}
        <linearGradient id={`${uniqueId}-core-top`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" stopOpacity="1" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.9)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.8)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`${uniqueId}-core-side`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.6)" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${uniqueId}-core-front`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.7)" stopOpacity="0.7" />
        </linearGradient>
        
        {/* Priority Indicator Gradients */}
        <linearGradient id={`${uniqueId}-priority-high`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF6666" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${uniqueId}-priority-medium`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFCC44" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${uniqueId}-priority-low`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E1FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#44EEFF" stopOpacity="0.7" />
        </linearGradient>
        
        {/* Process Flow Gradient */}
        <linearGradient id={`${uniqueId}-flow`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 225, 255, 0.6)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.5)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.6)" stopOpacity="0.6" />
        </linearGradient>
        
        {/* Shadow Gradient */}
        <radialGradient id={`${uniqueId}-shadow`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(0, 0, 0, 0.4)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" stopOpacity="0" />
        </radialGradient>
        
        {/* Glow Filters */}
        <filter id={`${uniqueId}-glow`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uniqueId}-glow-core`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uniqueId}-shadow`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Floor/Platform - 3D Perspective */}
      <rect x="50" y="380" width="400" height="100" rx="8" fill="rgba(30, 30, 30, 0.3)" opacity="0.2" />
      <polygon points="50,380 450,380 420,420 80,420" fill="rgba(20, 20, 20, 0.4)" opacity="0.3" />

      {/* Central Core Control Unit - 3D Isometric - Autonomous Control Center */}
      <g transform="translate(200, 150)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="200,150; 202,148; 198,152; 201,149; 200,150"
          dur="4s"
          repeatCount="indefinite"
          additive="sum"
        />
        <g>
          {/* Shadow */}
          <ellipse cx="0" cy="60" rx="35" ry="12" fill={`url(#${uniqueId}-shadow)`} opacity="0.5" filter={`url(#${uniqueId}-shadow)`} />
          
          {/* 3D Box - Top Face */}
          <polygon
            points="-30,-20 30,-20 40,0 10,0"
            fill={`url(#${uniqueId}-core-top)`}
            filter={`url(#${uniqueId}-glow-core)`}
            opacity="0.95"
          />
          {/* 3D Box - Right Side */}
          <polygon
            points="30,-20 40,0 40,40 30,20"
            fill={`url(#${uniqueId}-core-side)`}
            filter={`url(#${uniqueId}-glow-core)`}
            opacity="0.9"
          />
          {/* 3D Box - Front Face */}
          <polygon
            points="-30,-20 10,0 30,20 -10,0"
            fill={`url(#${uniqueId}-core-front)`}
            filter={`url(#${uniqueId}-glow-core)`}
            opacity="0.95"
          />
          
          {/* Internal Process Lines */}
          <line x1="-15" y1="5" x2="15" y2="5" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5" opacity="0.8" />
          <line x1="-10" y1="15" x2="10" y2="15" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5" opacity="0.7" />
          <line x1="-20" y1="-5" x2="20" y2="-5" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="2" opacity="0.9" />
          
          {/* Core Indicator - Pulsating */}
          <circle cx="0" cy="-10" r="6" fill="#00E1FF" filter={`url(#${uniqueId}-glow-core)`} opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Resource Boxes - 3D Isometric - Different Sizes (Priorities) */}
      {/* High Priority Resource - Left */}
      <g transform="translate(80, 200)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="80,200; 85,195; 75,205; 82,198; 80,200"
          dur="3.5s"
          repeatCount="indefinite"
          additive="sum"
        />
        <g>
          {/* Shadow */}
          <ellipse cx="0" cy="25" rx="18" ry="6" fill={`url(#${uniqueId}-shadow)`} opacity="0.4" filter={`url(#${uniqueId}-shadow)`} />
          {/* 3D Box - Top */}
          <polygon points="-15,-10 15,-10 20,0 5,0" fill={`url(#${uniqueId}-box-top)`} filter={`url(#${uniqueId}-glow)`} opacity="0.85" />
          {/* 3D Box - Side */}
          <polygon points="15,-10 20,0 20,20 15,10" fill={`url(#${uniqueId}-box-side)`} filter={`url(#${uniqueId}-glow)`} opacity="0.8" />
          {/* 3D Box - Front */}
          <polygon points="-15,-10 5,0 15,10 -5,0" fill={`url(#${uniqueId}-box-front)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9" />
          {/* Priority Indicator - High */}
          <circle cx="0" cy="-15" r="4" fill={`url(#${uniqueId}-priority-high)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Medium Priority Resource - Top Right */}
      <g transform="translate(320, 120)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="320,120; 325,115; 315,125; 322,118; 320,120"
          dur="4s"
          repeatCount="indefinite"
          additive="sum"
        />
        <g>
          {/* Shadow */}
          <ellipse cx="0" cy="20" rx="15" ry="5" fill={`url(#${uniqueId}-shadow)`} opacity="0.4" filter={`url(#${uniqueId}-shadow)`} />
          {/* 3D Box - Top */}
          <polygon points="-12,-8 12,-8 16,0 4,0" fill={`url(#${uniqueId}-box-top)`} filter={`url(#${uniqueId}-glow)`} opacity="0.85" />
          {/* 3D Box - Side */}
          <polygon points="12,-8 16,0 16,16 12,8" fill={`url(#${uniqueId}-box-side)`} filter={`url(#${uniqueId}-glow)`} opacity="0.8" />
          {/* 3D Box - Front */}
          <polygon points="-12,-8 4,0 12,8 -4,0" fill={`url(#${uniqueId}-box-front)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9" />
          {/* Priority Indicator - Medium */}
          <circle cx="0" cy="-12" r="3.5" fill={`url(#${uniqueId}-priority-medium)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Low Priority Resource - Bottom Right */}
      <g transform="translate(360, 240)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="360,240; 365,235; 355,245; 362,238; 360,240"
          dur="4.5s"
          repeatCount="indefinite"
          additive="sum"
        />
        <g>
          {/* Shadow */}
          <ellipse cx="0" cy="18" rx="12" ry="4" fill={`url(#${uniqueId}-shadow)`} opacity="0.4" filter={`url(#${uniqueId}-shadow)`} />
          {/* 3D Box - Top */}
          <polygon points="-10,-6 10,-6 13,0 3,0" fill={`url(#${uniqueId}-box-top)`} filter={`url(#${uniqueId}-glow)`} opacity="0.85" />
          {/* 3D Box - Side */}
          <polygon points="10,-6 13,0 13,14 10,8" fill={`url(#${uniqueId}-box-side)`} filter={`url(#${uniqueId}-glow)`} opacity="0.8" />
          {/* 3D Box - Front */}
          <polygon points="-10,-6 3,0 10,8 -3,0" fill={`url(#${uniqueId}-box-front)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9" />
          {/* Priority Indicator - Low */}
          <circle cx="0" cy="-10" r="3" fill={`url(#${uniqueId}-priority-low)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Additional Resource - Bottom Left */}
      <g transform="translate(120, 280)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="120,280; 125,275; 115,285; 122,278; 120,280"
          dur="3.8s"
          repeatCount="indefinite"
          additive="sum"
        />
        <g>
          {/* Shadow */}
          <ellipse cx="0" cy="22" rx="16" ry="5" fill={`url(#${uniqueId}-shadow)`} opacity="0.4" filter={`url(#${uniqueId}-shadow)`} />
          {/* 3D Box - Top */}
          <polygon points="-13,-9 13,-9 17,0 4,0" fill={`url(#${uniqueId}-box-top)`} filter={`url(#${uniqueId}-glow)`} opacity="0.85" />
          {/* 3D Box - Side */}
          <polygon points="13,-9 17,0 17,18 13,9" fill={`url(#${uniqueId}-box-side)`} filter={`url(#${uniqueId}-glow)`} opacity="0.8" />
          {/* 3D Box - Front */}
          <polygon points="-13,-9 4,0 13,9 -4,0" fill={`url(#${uniqueId}-box-front)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9" />
          {/* Priority Indicator - Medium */}
          <circle cx="0" cy="-13" r="3.5" fill={`url(#${uniqueId}-priority-medium)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Process Flow Lines - Autonomous Coordination - Animated */}
      {/* Flow from Core to High Priority Resource */}
      <g>
        <path
          id={`${uniqueId}-flow1`}
          d="M 200 150 L 80 200"
          fill="none"
          stroke={`url(#${uniqueId}-flow)`}
          strokeWidth="2.5"
          opacity="0.6"
          filter={`url(#${uniqueId}-glow)`}
          strokeDasharray="8 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;12;0"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Flow Particles */}
        <circle r="2.5" fill="#00E1FF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href={`#${uniqueId}-flow1`} xmlnsXlink="http://www.w3.org/1999/xlink" />
          </animateMotion>
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Flow from Core to Medium Priority Resource (Top Right) */}
      <g>
        <path
          id={`${uniqueId}-flow2`}
          d="M 200 150 L 320 120"
          fill="none"
          stroke={`url(#${uniqueId}-flow)`}
          strokeWidth="2.5"
          opacity="0.6"
          filter={`url(#${uniqueId}-glow)`}
          strokeDasharray="8 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;12;0"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite" />
        </path>
        <circle r="2.5" fill="#A45CFF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
          <animateMotion dur="2.5s" repeatCount="indefinite">
            <mpath href={`#${uniqueId}-flow2`} xmlnsXlink="http://www.w3.org/1999/xlink" />
          </animateMotion>
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Flow from Core to Low Priority Resource (Bottom Right) */}
      <g>
        <path
          id={`${uniqueId}-flow3`}
          d="M 200 150 L 360 240"
          fill="none"
          stroke={`url(#${uniqueId}-flow)`}
          strokeWidth="2.5"
          opacity="0.6"
          filter={`url(#${uniqueId}-glow)`}
          strokeDasharray="8 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;12;0"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
        </path>
        <circle r="2.5" fill="#00E1FF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href={`#${uniqueId}-flow3`} xmlnsXlink="http://www.w3.org/1999/xlink" />
          </animateMotion>
          <animate attributeName="opacity" values="0.9;0;0.9" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Flow from Core to Bottom Left Resource */}
      <g>
        <path
          id={`${uniqueId}-flow4`}
          d="M 200 150 L 120 280"
          fill="none"
          stroke={`url(#${uniqueId}-flow)`}
          strokeWidth="2.5"
          opacity="0.6"
          filter={`url(#${uniqueId}-glow)`}
          strokeDasharray="8 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;12;0"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.8s" repeatCount="indefinite" />
        </path>
        <circle r="2.5" fill="#A45CFF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
          <animateMotion dur="2.8s" repeatCount="indefinite">
            <mpath href={`#${uniqueId}-flow4`} xmlnsXlink="http://www.w3.org/1999/xlink" />
          </animateMotion>
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

// NEXCEL CRM - Living System Visualization - Dynamic Neural Network Data Flow
export function CrmVisual() {
  const uniqueId = `crm-living-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ filter: "drop-shadow(0 0 30px rgba(0, 225, 255, 0.5)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.4))" }}
    >
      <defs>
        {/* Neural Network Node Gradients */}
        <radialGradient id={`${uniqueId}-node-core`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" stopOpacity="1" />
          <stop offset="40%" stopColor="rgba(168, 85, 247, 0.9)" stopOpacity="0.9" />
          <stop offset="70%" stopColor="rgba(0, 225, 255, 0.7)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.3)" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id={`${uniqueId}-node-customer`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(0, 225, 255, 1)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.2)" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id={`${uniqueId}-node-order`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 1)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id={`${uniqueId}-node-employee`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255, 170, 0, 1)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgba(255, 170, 0, 0.2)" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id={`${uniqueId}-node-process`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(0, 255, 150, 1)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgba(0, 255, 150, 0.2)" stopOpacity="0.2" />
        </radialGradient>
        
        {/* Living Connection Gradients */}
        <linearGradient id={`${uniqueId}-connection-pulse`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 225, 255, 0.8)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.9)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.8)" stopOpacity="0.8" />
        </linearGradient>
        
        {/* Glow Filters */}
        <filter id={`${uniqueId}-glow-strong`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uniqueId}-glow`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central Living Hub - Pulsating Neural Core */}
      <g transform="translate(250, 200)">
        <g>
          {/* Outer Pulse Rings */}
          <circle cx="0" cy="0" r="45" fill="none" stroke={`url(#${uniqueId}-connection-pulse)`} strokeWidth="2" opacity="0.4" filter={`url(#${uniqueId}-glow)`}>
            <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="35" fill="none" stroke={`url(#${uniqueId}-connection-pulse)`} strokeWidth="1.5" opacity="0.5" filter={`url(#${uniqueId}-glow)`}>
            <animate attributeName="r" values="35;42;35" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          
          {/* Central Core */}
          <circle cx="0" cy="0" r="25" fill={`url(#${uniqueId}-node-core)`} filter={`url(#${uniqueId}-glow-strong)`} opacity="0.95">
            <animate attributeName="r" values="25;27;25" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="18" fill="rgba(255, 255, 255, 0.3)" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="12" fill="rgba(168, 85, 247, 0.6)" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Data Nodes - Living Network Points - Customer Data */}
      {[
        { x: 100, y: 120, type: "customer", delay: 0 },
        { x: 150, y: 80, type: "customer", delay: 0.3 },
        { x: 80, y: 180, type: "customer", delay: 0.6 },
      ].map((node, i) => (
        <g key={`customer-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x + 2},${node.y - 2}; ${node.x - 2},${node.y + 2}; ${node.x},${node.y}`}
            dur="4s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="12" fill={`url(#${uniqueId}-node-customer)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.5s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Order Data Nodes */}
      {[
        { x: 400, y: 100, type: "order", delay: 0.2 },
        { x: 380, y: 150, type: "order", delay: 0.5 },
        { x: 420, y: 180, type: "order", delay: 0.8 },
      ].map((node, i) => (
        <g key={`order-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x - 2},${node.y - 2}; ${node.x + 2},${node.y + 2}; ${node.x},${node.y}`}
            dur="4.2s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="12" fill={`url(#${uniqueId}-node-order)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="12;14;12" dur="2.2s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.2s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.6s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Employee Data Nodes */}
      {[
        { x: 420, y: 300, type: "employee", delay: 0.4 },
        { x: 380, y: 320, type: "employee", delay: 0.7 },
        { x: 400, y: 350, type: "employee", delay: 1 },
      ].map((node, i) => (
        <g key={`employee-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x - 2},${node.y + 2}; ${node.x + 2},${node.y - 2}; ${node.x},${node.y}`}
            dur="3.8s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="11" fill={`url(#${uniqueId}-node-employee)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="11;13;11" dur="2.3s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.3s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.7s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Process Data Nodes */}
      {[
        { x: 80, y: 300, type: "process", delay: 0.1 },
        { x: 120, y: 320, type: "process", delay: 0.4 },
        { x: 100, y: 350, type: "process", delay: 0.7 },
      ].map((node, i) => (
        <g key={`process-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x + 2},${node.y + 2}; ${node.x - 2},${node.y - 2}; ${node.x},${node.y}`}
            dur="4.5s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="11" fill={`url(#${uniqueId}-node-process)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="11;13;11" dur="2.1s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.1s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.8s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Living Connections - Dynamic Neural Network Links */}
      {/* Connections from Customer Nodes to Central Hub */}
      {[100, 150, 80].map((x, i) => (
        [120, 80, 180].map((y, j) => {
          if (i === j) {
            const pathId = `${uniqueId}-conn-customer-${i}`;
            const duration = `${2 + i * 0.3}s`;
            return (
              <g key={`customer-conn-${i}`}>
                <path
                  id={pathId}
                  d={`M ${x} ${y} Q ${(x + 250) / 2} ${(y + 200) / 2} 250 200`}
                  fill="none"
                  stroke={`url(#${uniqueId}-connection-pulse)`}
                  strokeWidth="2"
                  opacity="0.6"
                  filter={`url(#${uniqueId}-glow)`}
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;6;0"
                    dur={duration}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
                </path>
                <circle r="2" fill="#00E1FF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
                  <animateMotion dur={duration} repeatCount="indefinite">
                    <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
                </circle>
              </g>
            );
          }
          return null;
        })
      )).flat()}

      {/* Connections from Order Nodes to Central Hub */}
      {[400, 380, 420].map((x, i) => (
        [100, 150, 180].map((y, j) => {
          if (i === j) {
            const pathId = `${uniqueId}-conn-order-${i}`;
            const duration = `${2.2 + i * 0.3}s`;
            return (
              <g key={`order-conn-${i}`}>
                <path
                  id={pathId}
                  d={`M ${x} ${y} Q ${(x + 250) / 2} ${(y + 200) / 2} 250 200`}
                  fill="none"
                  stroke={`url(#${uniqueId}-connection-pulse)`}
                  strokeWidth="2"
                  opacity="0.6"
                  filter={`url(#${uniqueId}-glow)`}
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;6;0"
                    dur={duration}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
                </path>
                <circle r="2" fill="#A45CFF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
                  <animateMotion dur={duration} repeatCount="indefinite">
                    <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
                </circle>
              </g>
            );
          }
          return null;
        })
      )).flat()}

      {/* Connections from Employee Nodes to Central Hub */}
      {[420, 380, 400].map((x, i) => (
        [300, 320, 350].map((y, j) => {
          if (i === j) {
            const pathId = `${uniqueId}-conn-employee-${i}`;
            const duration = `${2.4 + i * 0.3}s`;
            return (
              <g key={`employee-conn-${i}`}>
                <path
                  id={pathId}
                  d={`M ${x} ${y} Q ${(x + 250) / 2} ${(y + 200) / 2} 250 200`}
                  fill="none"
                  stroke={`url(#${uniqueId}-connection-pulse)`}
                  strokeWidth="2"
                  opacity="0.6"
                  filter={`url(#${uniqueId}-glow)`}
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;6;0"
                    dur={duration}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
                </path>
                <circle r="2" fill="#FFAA00" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
                  <animateMotion dur={duration} repeatCount="indefinite">
                    <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
                </circle>
              </g>
            );
          }
          return null;
        })
      )).flat()}

      {/* Connections from Process Nodes to Central Hub */}
      {[80, 120, 100].map((x, i) => (
        [300, 320, 350].map((y, j) => {
          if (i === j) {
            const pathId = `${uniqueId}-conn-process-${i}`;
            const duration = `${2.1 + i * 0.3}s`;
            return (
              <g key={`process-conn-${i}`}>
                <path
                  id={pathId}
                  d={`M ${x} ${y} Q ${(x + 250) / 2} ${(y + 200) / 2} 250 200`}
                  fill="none"
                  stroke={`url(#${uniqueId}-connection-pulse)`}
                  strokeWidth="2"
                  opacity="0.6"
                  filter={`url(#${uniqueId}-glow)`}
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;6;0"
                    dur={duration}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
                </path>
                <circle r="2" fill="#00FF96" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
                  <animateMotion dur={duration} repeatCount="indefinite">
                    <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
                </circle>
              </g>
            );
          }
          return null;
        })
      )).flat()}

      {/* Inter-Node Connections - Living Network Mesh */}
      {/* Customer to Order Connections */}
      <path
        d="M 100 120 Q 200 100 400 100"
        fill="none"
        stroke="rgba(0, 225, 255, 0.3)"
        strokeWidth="1.5"
        opacity="0.4"
        filter={`url(#${uniqueId}-glow)`}
        strokeDasharray="3 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;6;0"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Order to Employee Connections */}
      <path
        d="M 400 180 Q 400 240 420 300"
        fill="none"
        stroke="rgba(168, 85, 247, 0.3)"
        strokeWidth="1.5"
        opacity="0.4"
        filter={`url(#${uniqueId}-glow)`}
        strokeDasharray="3 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;6;0"
          dur="3.2s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.2s" repeatCount="indefinite" />
      </path>

      {/* Employee to Process Connections */}
      <path
        d="M 400 350 Q 250 350 100 350"
        fill="none"
        stroke="rgba(255, 170, 0, 0.3)"
        strokeWidth="1.5"
        opacity="0.4"
        filter={`url(#${uniqueId}-glow)`}
        strokeDasharray="3 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;6;0"
          dur="3.5s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.5s" repeatCount="indefinite" />
      </path>

      {/* Process to Customer Connections */}
      <path
        d="M 80 300 Q 80 200 80 120"
        fill="none"
        stroke="rgba(0, 255, 150, 0.3)"
        strokeWidth="1.5"
        opacity="0.4"
        filter={`url(#${uniqueId}-glow)`}
        strokeDasharray="3 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;6;0"
          dur="2.8s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.8s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// NEXCEL AGENT - Active Thinking Instance - Neural Consciousness Visualization
export function AgentVisual() {
  const uniqueId = `agent-thinking-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ filter: "drop-shadow(0 0 30px rgba(0, 225, 255, 0.5)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.4))" }}
    >
      <defs>
        {/* Consciousness Core Gradients */}
        <radialGradient id={`${uniqueId}-consciousness-core`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" stopOpacity="1" />
          <stop offset="30%" stopColor="rgba(168, 85, 247, 0.95)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="rgba(0, 225, 255, 0.8)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.3)" stopOpacity="0.3" />
        </radialGradient>
        
        {/* Neural Node Gradients */}
        <radialGradient id={`${uniqueId}-neural-node`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" stopOpacity="0.95" />
          <stop offset="50%" stopColor="rgba(0, 225, 255, 0.7)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" stopOpacity="0.4" />
        </radialGradient>
        
        {/* Thought Process Gradients */}
        <linearGradient id={`${uniqueId}-thought-flow`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 225, 255, 0.8)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.9)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.8)" stopOpacity="0.8" />
        </linearGradient>
        
        {/* Decision Path Gradients */}
        <linearGradient id={`${uniqueId}-decision-path`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 0.7)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgba(0, 225, 255, 0.6)" stopOpacity="0.6" />
        </linearGradient>
        
        {/* Glow Filters */}
        <filter id={`${uniqueId}-glow-strong`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.7" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uniqueId}-glow`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central Consciousness Core - Active Thinking Instance */}
      <g transform="translate(250, 200)">
        <g>
          {/* Outer Consciousness Rings - Expanding */}
          <circle cx="0" cy="0" r="60" fill="none" stroke={`url(#${uniqueId}-thought-flow)`} strokeWidth="2" opacity="0.3" filter={`url(#${uniqueId}-glow)`}>
            <animate attributeName="r" values="60;75;60" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="45" fill="none" stroke={`url(#${uniqueId}-thought-flow)`} strokeWidth="1.5" opacity="0.4" filter={`url(#${uniqueId}-glow)`}>
            <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Central Consciousness Core */}
          <circle cx="0" cy="0" r="35" fill={`url(#${uniqueId}-consciousness-core)`} filter={`url(#${uniqueId}-glow-strong)`} opacity="0.95">
            <animate attributeName="r" values="35;38;35" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="25" fill="rgba(255, 255, 255, 0.4)" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="18" fill="rgba(168, 85, 247, 0.7)" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="10" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* Neural Network Nodes - Thinking Processes */}
      {/* Layer 1 - Input Processing Nodes */}
      {[
        { x: 120, y: 100, delay: 0 },
        { x: 150, y: 80, delay: 0.2 },
        { x: 180, y: 100, delay: 0.4 },
      ].map((node, i) => (
        <g key={`input-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x + 1},${node.y - 1}; ${node.x - 1},${node.y + 1}; ${node.x},${node.y}`}
            dur="3.5s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="10" fill={`url(#${uniqueId}-neural-node)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.5s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Layer 2 - Decision Making Nodes */}
      {[
        { x: 320, y: 100, delay: 0.1 },
        { x: 350, y: 120, delay: 0.3 },
        { x: 380, y: 100, delay: 0.5 },
      ].map((node, i) => (
        <g key={`decision-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x - 1},${node.y - 1}; ${node.x + 1},${node.y + 1}; ${node.x},${node.y}`}
            dur="3.8s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="11" fill={`url(#${uniqueId}-neural-node)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="11;13;11" dur="2.2s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.2s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.6s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Layer 3 - Action Execution Nodes */}
      {[
        { x: 120, y: 300, delay: 0.2 },
        { x: 150, y: 320, delay: 0.4 },
        { x: 180, y: 300, delay: 0.6 },
      ].map((node, i) => (
        <g key={`action-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x + 1},${node.y + 1}; ${node.x - 1},${node.y - 1}; ${node.x},${node.y}`}
            dur="4s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="10" fill={`url(#${uniqueId}-neural-node)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="10;12;10" dur="2.1s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.1s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.7s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Layer 4 - Feedback Nodes */}
      {[
        { x: 320, y: 300, delay: 0.3 },
        { x: 350, y: 280, delay: 0.5 },
        { x: 380, y: 300, delay: 0.7 },
      ].map((node, i) => (
        <g key={`feedback-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${node.x},${node.y}; ${node.x - 1},${node.y + 1}; ${node.x + 1},${node.y - 1}; ${node.x},${node.y}`}
            dur="3.6s"
            repeatCount="indefinite"
            begin={`${node.delay}s`}
            additive="sum"
          />
          <circle cx="0" cy="0" r="9" fill={`url(#${uniqueId}-neural-node)`} filter={`url(#${uniqueId}-glow)`} opacity="0.9">
            <animate attributeName="r" values="9;11;9" dur="2.3s" repeatCount="indefinite" begin={`${node.delay}s`} />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.3s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.8s" repeatCount="indefinite" begin={`${node.delay}s`} />
          </circle>
        </g>
      ))}

      {/* Neural Connections - Thought Processes */}
      {/* Connections from Input to Consciousness */}
      {[120, 150, 180].map((x, i) => {
        const pathId = `${uniqueId}-conn-input-${i}`;
        const duration = `${2 + i * 0.3}s`;
        return (
          <g key={`input-conn-${i}`}>
            <path
              id={pathId}
              d={`M ${x} ${100} Q ${(x + 250) / 2} ${(100 + 200) / 2} 250 200`}
              fill="none"
              stroke={`url(#${uniqueId}-thought-flow)`}
              strokeWidth="2"
              opacity="0.6"
              filter={`url(#${uniqueId}-glow)`}
              strokeDasharray="4 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;6;0"
                dur={duration}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
            </path>
            <circle r="2" fill="#00E1FF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
              <animateMotion dur={duration} repeatCount="indefinite">
                <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
              </animateMotion>
              <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Connections from Consciousness to Decision */}
      {[320, 350, 380].map((x, i) => {
        const pathId = `${uniqueId}-conn-decision-${i}`;
        const duration = `${2.2 + i * 0.3}s`;
        return (
          <g key={`decision-conn-${i}`}>
            <path
              id={pathId}
              d={`M 250 200 Q ${(250 + x) / 2} ${(200 + 100) / 2} ${x} 100`}
              fill="none"
              stroke={`url(#${uniqueId}-decision-path)`}
              strokeWidth="2"
              opacity="0.6"
              filter={`url(#${uniqueId}-glow)`}
              strokeDasharray="4 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;6;0"
                dur={duration}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
            </path>
            <circle r="2" fill="#A45CFF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
              <animateMotion dur={duration} repeatCount="indefinite">
                <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
              </animateMotion>
              <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Connections from Decision to Action */}
      {[120, 150, 180].map((x, i) => {
        const pathId = `${uniqueId}-conn-action-${i}`;
        const duration = `${2.4 + i * 0.3}s`;
        return (
          <g key={`action-conn-${i}`}>
            <path
              id={pathId}
              d={`M ${320 + i * 30} 100 Q ${(320 + i * 30 + x) / 2} ${(100 + 300) / 2} ${x} 300`}
              fill="none"
              stroke={`url(#${uniqueId}-thought-flow)`}
              strokeWidth="2"
              opacity="0.6"
              filter={`url(#${uniqueId}-glow)`}
              strokeDasharray="4 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;6;0"
                dur={duration}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
            </path>
            <circle r="2" fill="#00E1FF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
              <animateMotion dur={duration} repeatCount="indefinite">
                <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
              </animateMotion>
              <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Connections from Action to Feedback */}
      {[320, 350, 380].map((x, i) => {
        const pathId = `${uniqueId}-conn-feedback-${i}`;
        const duration = `${2.5 + i * 0.3}s`;
        return (
          <g key={`feedback-conn-${i}`}>
            <path
              id={pathId}
              d={`M ${120 + i * 30} 300 Q ${(120 + i * 30 + x) / 2} ${(300 + 300) / 2} ${x} 300`}
              fill="none"
              stroke={`url(#${uniqueId}-decision-path)`}
              strokeWidth="2"
              opacity="0.6"
              filter={`url(#${uniqueId}-glow)`}
              strokeDasharray="4 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;6;0"
                dur={duration}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur={duration} repeatCount="indefinite" />
            </path>
            <circle r="2" fill="#A45CFF" filter={`url(#${uniqueId}-glow)`} opacity="0.9">
              <animateMotion dur={duration} repeatCount="indefinite">
                <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
              </animateMotion>
              <animate attributeName="opacity" values="0.9;0;0.9" dur={duration} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Feedback Loop - Back to Consciousness */}
      {[320, 350, 380].map((x, i) => {
        const pathId = `${uniqueId}-conn-loop-${i}`;
        const duration = `${2.6 + i * 0.3}s`;
        return (
          <g key={`loop-conn-${i}`}>
            <path
              id={pathId}
              d={`M ${x} 300 Q ${(x + 250) / 2} ${(300 + 200) / 2} 250 200`}
              fill="none"
              stroke={`url(#${uniqueId}-thought-flow)`}
              strokeWidth="1.5"
              opacity="0.5"
              filter={`url(#${uniqueId}-glow)`}
              strokeDasharray="3 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;5;0"
                dur={duration}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur={duration} repeatCount="indefinite" />
            </path>
            <circle r="1.5" fill="#00E1FF" filter={`url(#${uniqueId}-glow)`} opacity="0.8">
              <animateMotion dur={duration} repeatCount="indefinite">
                <mpath href={`#${pathId}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
              </animateMotion>
              <animate attributeName="opacity" values="0.8;0;0.8" dur={duration} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Thought Particles - Floating Ideas */}
      {[
        { x: 80, y: 150, delay: 0 },
        { x: 420, y: 150, delay: 0.5 },
        { x: 80, y: 250, delay: 1 },
        { x: 420, y: 250, delay: 1.5 },
      ].map((particle, i) => (
        <g key={`particle-${i}`}>
          <circle
            cx={particle.x}
            cy={particle.y}
            r="4"
            fill="rgba(168, 85, 247, 0.7)"
            filter={`url(#${uniqueId}-glow)`}
            opacity="0.8"
          >
            <animate
              attributeName="cx"
              values={`${particle.x};${particle.x + 20};${particle.x}`}
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
              begin={`${particle.delay}s`}
            />
            <animate
              attributeName="cy"
              values={`${particle.y};${particle.y - 15};${particle.y}`}
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
              begin={`${particle.delay}s`}
            />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${particle.delay}s`} />
            <animate attributeName="r" values="4;6;4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${particle.delay}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

