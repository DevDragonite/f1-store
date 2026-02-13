import { useRef, useEffect, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef(null)
    const dotRef = useRef(null)
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
            }
        }

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [role="button"], input[type="submit"], select, label[class*="cursor"]')
            if (target) setHovering(true)
        }

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button, [role="button"], input[type="submit"], select, label[class*="cursor"]')
            if (target) setHovering(false)
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        document.addEventListener('mouseover', handleMouseOver, { passive: true })
        document.addEventListener('mouseout', handleMouseOut, { passive: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none will-change-transform"
            style={{ zIndex: 10000 }}
        >
            {/* Main cursor — chevron */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    filter: hovering
                        ? 'drop-shadow(0 0 8px rgba(225, 6, 0, 0.8))'
                        : 'drop-shadow(0 0 3px rgba(225, 6, 0, 0.5))',
                    transition: 'filter 0.2s ease, transform 0.2s ease',
                    transform: hovering ? 'scale(1.3)' : 'scale(1)',
                }}
            >
                <path
                    d="M4 20L12 4L20 20L12 16L4 20Z"
                    fill="rgba(225, 6, 0, 0.9)"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Hover ring — expands when over interactive elements */}
            <div
                ref={dotRef}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: hovering ? '36px' : '0px',
                    height: hovering ? '36px' : '0px',
                    borderRadius: '50%',
                    border: '1px solid rgba(225, 6, 0, 0.5)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1), height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
                    opacity: hovering ? 1 : 0,
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}
