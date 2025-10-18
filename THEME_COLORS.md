# Theme Colors Documentation

This document explains how to use the custom theme colors that have been added to your portfolio website.

## Color Palette

The theme includes the following color variables that automatically adapt to light and dark modes:

### Primary Colors
- `bg-primary` / `text-primary`: Main accent color (yellow/orange)
- `bg-primary-foreground` / `text-primary-foreground`: Text color for primary backgrounds

### Secondary Colors
- `bg-secondary` / `text-secondary`: Secondary accent color (blue)
- `bg-secondary-foreground` / `text-secondary-foreground`: Text color for secondary backgrounds

### Additional Colors
- `bg-accent` / `text-accent`: Additional accent color (cyan/blue)
- `bg-accent-foreground` / `text-accent-foreground`: Text color for accent backgrounds
- `bg-muted` / `text-muted`: Subtle background/text color
- `bg-muted-foreground` / `text-muted-foreground`: Text color for muted backgrounds
- `bg-card` / `text-card`: Card background color
- `bg-card-foreground` / `text-card-foreground`: Text color for card backgrounds
- `bg-background` / `text-background`: Main background color
- `bg-foreground` / `text-foreground`: Main text color
- `border-border`: Border color
- `bg-input` / `text-input`: Input field colors

## Usage Examples

### Using Primary Colors
```jsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded">
  Primary Button
</button>
```

### Using Card Colors
```jsx
<div className="bg-card text-card-foreground border border-border p-6 rounded-lg">
  This is a card with theme-aware colors
</div>
```

### Using Muted Colors
```jsx
<div className="bg-muted text-muted-foreground p-4 rounded">
  This is a muted section
</div>
```

## How It Works

The colors are defined as CSS variables in `globals.css` and mapped to Tailwind classes in `tailwind.config.ts`. When the theme is switched between light and dark modes, these variables automatically update to their appropriate values.

### Light Theme Colors
- Background: White (`#ffffff`)
- Foreground: Dark gray (`#171717`)
- Primary: Amber (`#f59e0b`)
- Secondary: Blue (`#1e40af`)
- Muted: Light gray (`#f3f4f6`)

### Dark Theme Colors
- Background: Dark gray (`#0a0a0a`)
- Foreground: Light gray (`#ededed`)
- Primary: Amber (`#f59e0b`)
- Secondary: Blue (`#3b82f6`)
- Muted: Darker gray (`#1f1f1f`)

## Adding New Components

To create new components that automatically adapt to theme changes, use the Tailwind classes listed above. The colors will automatically switch when the user toggles between light and dark modes.