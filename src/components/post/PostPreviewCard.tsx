//import Button from '../shared/Button';

interface Props {
  id: string;
  author: string;
  title: string;
  tags: [];
  thumbnail: string;
  aspect: string;
}

const PostPreviewCard = ({
  id,
  author,
  title,
  tags,
  thumbnail,
  aspect,
}: Props) => {
  console.log(id,tags,thumbnail,aspect)
  return (
    <div className='w-max relative' onClick={() => alert('Open detail')}>
      <img
        src="https://placehold.co/200"
        alt={`Post by ${author} - Post title ${title}`}
      />
    </div>
  );
};

export default PostPreviewCard;
