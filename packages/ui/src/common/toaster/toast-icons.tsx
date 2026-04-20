export function SuccessIcon({ clipId }: { clipId: string }) {
  return (
    <div className="size-9 shrink-0">
      <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <rect
            x="4.99935"
            y="5"
            width="25"
            height="25"
            rx="12.5"
            stroke="#079455"
            strokeWidth="1.66667"
          />
        </g>
        <g opacity="0.1">
          <rect
            x="0.833333"
            y="0.833333"
            width="33.3333"
            height="33.3333"
            rx="16.6667"
            stroke="#079455"
            strokeWidth="1.66667"
          />
        </g>
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M13.7493 17.5L16.2493 20L21.2493 15M25.8327 17.5C25.8327 22.1024 22.1017 25.8333 17.4993 25.8333C12.897 25.8333 9.16602 22.1024 9.16602 17.5C9.16602 12.8976 12.897 9.16667 17.4993 9.16667C22.1017 9.16667 25.8327 12.8976 25.8327 17.5Z"
            stroke="#079455"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(7.5 7.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export function ErrorIcon({ clipId }: { clipId: string }) {
  return (
    <div className="size-9 shrink-0">
      <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <rect
            x="6"
            y="6"
            width="26"
            height="26"
            rx="13"
            stroke="#D92D20"
            strokeWidth="2"
          />
        </g>
        <g opacity="0.1">
          <rect
            x="1"
            y="1"
            width="36"
            height="36"
            rx="18"
            stroke="#D92D20"
            strokeWidth="2"
          />
        </g>
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M18.9993 15.6667V19M18.9993 22.3333H19.0077M27.3327 19C27.3327 23.6024 23.6017 27.3333 18.9993 27.3333C14.397 27.3333 10.666 23.6024 10.666 19C10.666 14.3976 14.397 10.6667 18.9993 10.6667C23.6017 10.6667 27.3327 14.3976 27.3327 19Z"
            stroke="#D92D20"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(9 9)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
