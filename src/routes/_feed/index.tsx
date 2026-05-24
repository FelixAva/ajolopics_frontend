import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_feed/')({
  component: FeedIndex,
})

function FeedIndex() {
  return null;
}
