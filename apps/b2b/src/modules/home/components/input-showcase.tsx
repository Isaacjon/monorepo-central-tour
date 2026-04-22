import { InputField, PasswordInputField } from "ui"

const CircleHelpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-muted-foreground shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
)

/** Example trailing actions. Error state adds `alert.svg` from `InputField` on the far right. */
const TrailingActions = () => <CircleHelpIcon />

export function InputShowcase() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <InputField
        label="Email"
        name="showcase-field-email-a"
        placeholder="olivia@untitledui.com"
        autoComplete="off"
        trailing={<TrailingActions />}
        hintLeft="Hint Text"
        hintRight="Hint Text"
      />

      <PasswordInputField
        label="Password"
        name="showcase-field-password-demo"
        placeholder="••••••••"
        autoComplete="new-password"
        trailing={<TrailingActions />}
        hintLeft="Hint Text"
        hintRight="Hint Text"
      />

      <InputField
        label="Email"
        name="showcase-field-email-b"
        defaultValue="olivia@untitledui.com"
        autoComplete="off"
        trailing={<CircleHelpIcon />}
        hintLeft="Hint Text"
        hintRight="Hint Text"
      />

      <InputField
        label="Email"
        name="showcase-field-email-c"
        defaultValue="olivia@untitledui.com"
        variant="error"
        autoComplete="off"
        trailing={<TrailingActions />}
        hintLeft="This field is required."
        hintRight="Hint Text"
      />

      <InputField
        label="Email"
        name="showcase-field-email-d"
        placeholder="olivia@untitledui.com"
        disabled
        autoComplete="off"
        trailing={<TrailingActions />}
        hintLeft="Hint Text"
        hintRight="Hint Text"
      />
    </div>
  )
}
