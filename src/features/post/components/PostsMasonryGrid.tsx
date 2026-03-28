import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import usePost from '../hooks/usePost';
import type { GetFeedRequestDTO } from '../types/post.api.types';
import { Route } from '@/routes/index';

import PostCard from './PostCard';
import PostModalWrapper from './PostModalWrapper';
// Importamos tu nuevo componente
import MasonryGrid, { type MasonryElement } from '@/components/layout/MasonryGrid';

const PostsMasonryGrid = () => {
  const { tags, authors, search, aspectRatio } = Route.useSearch();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // 1. Estado para manejar el número de columnas dinámico (Responsive)
  const [columnsNumber, setColumnsNumber] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Replicamos tu lógica de breakpoints
      if (width >= 1024) setColumnsNumber(4);      // Default
      else if (width >= 768) setColumnsNumber(3);  // 1024px max
      else setColumnsNumber(2);                    // 768px y 640px max
    };

    handleResize(); // Ejecución inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const feedParams: GetFeedRequestDTO = useMemo(
    () => ({
      size: 20,
      search,
      filters: {
        tagIds: tags ? tags.split(',').map(Number) : undefined,
        authorIds: authors ? authors.split(',') : undefined,
        aspectRatio: aspectRatio || undefined,
      },
    }),
    [tags, authors, search, aspectRatio]
  );

  const { getPostFeed } = usePost(feedParams);

  const {
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    data,
  } = getPostFeed;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  const hasStartedTrackingRef = useRef(false);
  const prevInViewRef = useRef(false);

  useEffect(() => {
    hasStartedTrackingRef.current = false;
    prevInViewRef.current = false;
  }, [feedParams]);

  useEffect(() => {
    if (!isLoading && data && !hasStartedTrackingRef.current) {
      hasStartedTrackingRef.current = true;
      prevInViewRef.current = inView;
    }
  }, [isLoading, data, inView]);

  useEffect(() => {
    if (!hasStartedTrackingRef.current) return;

    const enteredView = inView && !prevInViewRef.current;

    if (enteredView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    prevInViewRef.current = inView;
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.items) ?? [];

  // 2. Preparamos los elementos para tu MasonryGrid
  const masonryElements: MasonryElement[] = useMemo(() => {
    return allPosts.map((post) => {
      /* ¡IMPORTANTE! ESTIMACIÓN DE ALTURA
        Asumo que tu objeto `post` trae las dimensiones originales de la imagen.
        Si las columnas son, por ejemplo, de 300px de ancho fijo o porcentual,
        puedes usar el aspect ratio para sacar un "peso" o "altura estimada".
        Si tu API devuelve un `aspectRatio` (ej: 1.5), height = ancho_estimado * aspectRatio
        O si devuelve height y width: (height / width) * 100

        Aquí uso una altura falsa (`post.height`) como ejemplo. ¡Debes ajustarlo a tu API!
      */
     const thumbnail = post.assets[0]?.variants.find((variant) => variant.variant === 'THUMBNAIL');
      const estimatedHeight = thumbnail?.height || 250;

      return {
        id: `${post.author}-${post.id}`,
        content: (
          <PostCard
            post={post}
            onClick={(id) => setSelectedPostId(id)}
          />
        ),
        height: estimatedHeight,
      };
    });
  }, [allPosts]);

  return (
    <>
      {isLoading && masonryElements.length === 0 ? (
        <p className="text-center py-4">Cargando galería...</p>
      ) : (
        <MasonryGrid
          columns_number={columnsNumber}
          elements={masonryElements}
          // Traducimos tus clases anteriores a las nuevas props
          containerStyle="m-auto max-w-7xl px-2 gap-4"
          columnStyle="gap-4" // Separación vertical entre cards
          threshold={20} // Ajusta esto según qué tan parecidas quieres las alturas
        />
      )}

      <PostModalWrapper
        postId={selectedPostId}
        isOpen={!!selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />

      {hasNextPage && (
        <div ref={ref} className="w-full flex justify-center py-4 min-h-10">
          {isFetchingNextPage && <p>Cargando más...</p>}
        </div>
      )}
    </>
  );
};

export default PostsMasonryGrid;

// import { useEffect, useMemo, useRef, useState } from 'react';
// import Masonry from 'react-masonry-css';
// import { useInView } from 'react-intersection-observer';

// import usePost from '../hooks/usePost';
// import type { GetFeedRequestDTO } from '../types/post.api.types';
// import { Route } from '@/routes/index';

// import PostPreviewCard from './PostPreviewCard';
// import PostDetailModal from './PostDetailModal';

// const PostsMasonryGrid = () => {
//   const { tags, authors, search, aspectRatio } = Route.useSearch();
//   const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

//   const feedParams: GetFeedRequestDTO = useMemo(
//     () => ({
//       size: 20,
//       search,
//       filters: {
//         tagIds: tags ? tags.split(',').map(Number) : undefined,
//         authorIds: authors ? authors.split(',') : undefined,
//         aspectRatio: aspectRatio || undefined,
//       },
//     }),
//     [tags, authors, search, aspectRatio]
//   );

//   const { getPostFeed } = usePost(feedParams);

//   const {
//     hasNextPage,
//     isFetchingNextPage,
//     fetchNextPage,
//     isLoading,
//     data,
//   } = getPostFeed;

//   const { ref, inView } = useInView({
//     threshold: 0,
//     rootMargin: '200px',
//   });

//   const hasStartedTrackingRef = useRef(false);
//   const prevInViewRef = useRef(false);

//   useEffect(() => {
//     hasStartedTrackingRef.current = false;
//     prevInViewRef.current = false;
//   }, [feedParams]);

//   useEffect(() => {
//     if (!isLoading && data && !hasStartedTrackingRef.current) {
//       hasStartedTrackingRef.current = true;
//       prevInViewRef.current = inView;
//     }
//   }, [isLoading, data, inView]);

//   useEffect(() => {
//     if (!hasStartedTrackingRef.current) return;

//     const enteredView = inView && !prevInViewRef.current;

//     if (enteredView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }

//     prevInViewRef.current = inView;
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   const breakpointColumns = {
//     default: 4,
//     1024: 3,
//     768: 2,
//     640: 2,
//   };

//   const allPosts = data?.pages.flatMap((page) => page.items) ?? [];

//   return (
//     <>
//       <Masonry
//         breakpointCols={breakpointColumns}
//         className="flex m-auto max-w-7xl w-auto"
//         columnClassName="px-2 bg-clip-padding"
//       >
//         {isLoading ? (
//           <p>Cargando galería...</p>
//         ) : (
//           allPosts.map((post) => (
//             <PostPreviewCard
//               key={`${post.author}-${post.id}`}
//               post={post}
//               onClick={(id) => setSelectedPostId(id)}
//             />
//           ))
//         )}
//       </Masonry>

//       <PostDetailModal
//         postId={selectedPostId}
//         isOpen={!!selectedPostId}
//         onClose={() => setSelectedPostId(null)}
//       />

//       {hasNextPage && (
//         <div ref={ref} className="w-full flex justify-center py-4 min-h-10">
//           {isFetchingNextPage && <p>Cargando más...</p>}
//         </div>
//       )}
//     </>
//   );
// };

// export default PostsMasonryGrid;
