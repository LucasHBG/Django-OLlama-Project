import { useRef, type RefObject } from "react"

/**
 * This hook is designed to be used in a React component to handle 
 * form submission when the Enter key is pressed within an `<textarea>` element.
 * @returns **`formRef`** to create a DOM element reference and
 * **`onKeyDown`** which is an event handler for the keydown event on an `<textarea>` element.
 */
export function UseEnterSubmit(): {
    formRef: RefObject<HTMLFormElement>
    onKeyDown: (event: React.KeyboardEvent<HTMLAreaElement>) => void
} {
    const formRef = useRef<HTMLFormElement>(null)

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLAreaElement>
    ): void => {
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
        ) {
            formRef.current?.requestSubmit()
            event.preventDefault()
        }
    }

    return { formRef, onKeyDown: handleKeyDown }
}
