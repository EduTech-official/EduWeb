const Gallery2 = () => {
  const images = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
  ];

  return (
    <div>
      <div className="pt-8 grid grid-cols-2 md:grid-cols-4 justify-center gap-4 px-4">
        <div className="grid gap-4 justify-center">
          {images.slice(0, 3).map((image, index) => (
            <div key={index}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {images.slice(3, 6).map((image, index) => (
            <div key={index}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="grid gap-4 justify-center">
          {images.slice(6, 9).map((image, index) => (
            <div key={index}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {images.slice(9, 12).map((image, index) => (
            <div key={index}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery2;
