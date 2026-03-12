interface AuthorBylineProps {
  author?: { name?: string; socialHandle?: string; socialLink?: string }
}

export function AuthorByline({ author }: AuthorBylineProps) {
  if (!author?.name) return null

  const handleText = author.socialHandle?.trim()
  const link = author.socialLink?.trim()
  const hasSocial = Boolean(handleText || link)

  return (
    <div className="flex gap-2 text-xs font-medium text-[#7D7D7D] md:text-base dark:text-[#A9A9A9]">
      <span>By {author.name}</span>
      {hasSocial && (
        <span>
          {' ('}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-2"
            >
              {handleText || 'Profile'}
            </a>
          ) : (
            <span>{handleText}</span>
          )}
          {')'}
        </span>
      )}
    </div>
  )
}
