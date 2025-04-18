export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>© {currentYear} Aziz. All rights reserved.</p>
      </div>
    </footer>
  )
}
