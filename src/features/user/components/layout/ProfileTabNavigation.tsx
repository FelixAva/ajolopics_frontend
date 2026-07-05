import { Link } from '@tanstack/react-router';

interface TabNavigationProps {
  username: string;
}

const ProfileTabNavigation = ({ username }: TabNavigationProps) => {
  return (
    <div className='w-full h-10 flex justify-evenly items-center border-2 mt-2 mb-5'>

      {(
        [
          ['/profile/$username', 'Posts'],
          ['/profile/$username/likes', 'Likes'],
          ['/profile/$username/bookmarks', 'Bookmarks'],
        ] as const
      ).map(([to, label]) => {
        return (
          <div key={to}>
            <Link
              to={to}
              params={{ username }}
              activeOptions={
                {
                  // If the route points to the root of it's parent,
                  // make sure it's only active if it's exact
                  // exact: to === '.',
                }
              }
              preload="intent"
              className='block py-2 px-3 text-blue-700'
              activeProps={{ className: `font-bold` }}
            >{label}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default ProfileTabNavigation;
