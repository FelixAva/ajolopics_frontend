import { Link } from '@tanstack/react-router';

interface TabNavigationProps {
  username: string;
}

const ProfileTabNavigation = ({ username }: TabNavigationProps) => {
  return (
    <nav className="w-full border-b border-surface-border mt-2 mb-5">
      <div className="mx-auto flex h-12 max-w-xl items-end justify-center gap-2 px-3 sm:gap-6">
        {(
          [
            ['/profile/$username', 'Posts'],
            // ['/profile/$username/likes', 'Likes'],
            // ['/profile/$username/bookmarks', 'Bookmarks'],
          ] as const
        ).map(([to, label]) => {
          return (
            <Link
              key={to}
              to={to}
              params={{ username }}
              activeOptions={{ exact: true }}
              preload="intent"
              className="relative flex h-full min-w-0 flex-1 items-center justify-center px-3 text-sm font-medium text-muted-foreground transition-colors after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.75 after:origin-center after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 sm:text-base"
              activeProps={{
                className: 'font-semibold text-primary-active after:scale-x-100',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default ProfileTabNavigation;
