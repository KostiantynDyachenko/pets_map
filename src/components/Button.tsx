import React, {JSX} from 'react';
import {clsx} from "clsx";


type propTypes = {
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    href?: string,
    children?: JSX.Element | JSX.Element[] | string;
    className?: string,
    variant?: string,
    size?: string,
    isLoading?: boolean,
    upperCase?: boolean
}

export const Button = ({
                           type = 'button',
                           disabled,
                           href,
                           children,
                           className,
                           variant,
                           size = 'large',
                           isLoading,
                           upperCase = !variant?.endsWith('-link'),
                           ...rest
                       }: propTypes) => {
    const isDisabled = disabled || isLoading
    const finalClassName = clsx(
        {
            'uppercase': upperCase,

            'text-white bg-primary-500 disabled:bg-primary-300': variant === 'primary',
            'text-white bg-gray-800 disabled:bg-gray-600': variant === 'dark',
            'text-white bg-red-600 disabled:bg-red-400': variant === 'danger',
            'text-red-600 bg-red-600/10 disabled:bg-red-400/10': variant === 'danger-transparent',
            'text-white bg-green-600 disabled:bg-green-400': variant === 'success',
            'text-gray-800 bg-primary-100 disabled:bg-primary-100/50 disabled:text-gray-600': variant === 'neutral',
            'text-primary-700 bg-primary-100 disabled:bg-primary-100/50 disabled:text-primary-600': variant === 'primary-neutral',

            'border border-current': variant?.endsWith('-outline'),
            'text-primary-500 disabled:text-primary-300': variant === 'primary-outline' || variant === 'primary-link',
            'text-gray-800 disabled:text-gray-600': variant === 'dark-outline' || variant === 'dark-link',
            'text-red-600 disabled:text-red-400': variant === 'danger-outline' || variant === 'danger-link',
            'text-green-600 disabled:text-green-400': variant === 'success-outline' || variant === 'success-link',

            'underline': variant?.endsWith('-link'),
            'text-sm font-semibold text-center relative': !variant?.endsWith('-link'),
            'rounded-xl py-4': !variant?.endsWith('-link') && size === 'large',
            'rounded-lg py-1': !variant?.endsWith('-link') && size === 'small',
        },
        className,
    )
    return isDisabled || !href ? (
        <button
            type={type}
            className={finalClassName}
            disabled={isDisabled}
            {...rest}
        >
      <span className={clsx({'invisible': isLoading})} aria-hidden={isLoading}>
        {children}
      </span>
            {isLoading && (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-label="Loading...">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="animate-spin w-6 h-6 stroke-current"
              viewBox="0 0 24 24"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </span>
            )}
        </button>
    ) : (
        <a href={href} className={finalClassName}>
            {children}
        </a>
    );
}

