// PageBackground — fixed premium background layer (drifting gradient orbs, subtle grid, top glow)
// rendered once in the root layout behind all page content, theme-aware via CSS variables
export default function PageBackground() {
  return (
    <div className="page-bg" aria-hidden="true">
      {/* Subtle grid pattern fading out from the top */}
      <div className="page-bg__grid" />
      {/* Soft radial glow near the top */}
      <div className="page-bg__top-glow" />
      {/* Three slowly drifting gradient orbs */}
      <div className="page-bg__orb page-bg__orb--1" />
      <div className="page-bg__orb page-bg__orb--2" />
      <div className="page-bg__orb page-bg__orb--3" />
    </div>
  )
}
