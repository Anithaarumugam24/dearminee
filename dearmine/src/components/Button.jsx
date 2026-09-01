import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-rose text-ink hover:bg-rose-light shadow-[0_8px_24px_-8px_rgba(232,83,111,0.6)]',
  gold: 'bg-gold text-ink hover:bg-gold-soft shadow-[0_8px_24px_-8px_rgba(216,166,87,0.55)]',
  ghost: 'bg-transparent text-cream border border-cream/25 hover:border-gold hover:text-gold',
  subtle: 'bg-white/5 text-cream hover:bg-white/10 border border-white/10',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as = 'button',
  ...props
}) {
  const Component = motion[as] || motion.button
  return (
    <Component
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
