import TestimonialCard from '@components/common/testimonial-card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
// import { testimonials } from '@framework/static/testimonials';
import { testimonialsTwo } from '@framework/static/testimonials-two';
import { SwiperSlide } from 'swiper/react';

const testimonials = [
  {
    id: 1,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a/ACg8ocI0Lfvi8VBg4yji4csgiBx-hh4AwK_nm5BjeweHVGSu0skgIg=w90-h90-p-rp-mo-br100',
      width: 420,
      height: 420,
    },
    rating: 5.0,
    name: 'Anusha Adapa',
    text: 'I want to thank all the staff members for your amazing work and quality products. They are delivering their services on time and the way they treat customers is too good. Everything looked absolutely amazing! the room decoration exceeded our expectations and was so beautiful. The balloon and photo hangings looked stunning. In this pandemic situation your surprises brought lots of happiness and love. Absolutely you guys are doing great job. Wish you good luck!!',
  },
  {
    id: 2,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a-/ALV-UjWcJ6JxeF1fThqDNMx11WmwbKxeWkAjraPrm6lhL6BV87LArB4=w90-h90-p-rp-mo-br100',
      width: 420,
      height: 420,
    },
    rating: 5.0,
    name: 'Manu Manu',
    text: "It's a perfect platform to surprise ur loved ones... Am very much satisfied fr ur excellent work... No words to describe more over... I hope u guys can made many wonderful works and keep going in the same way and had great success at ur path.... Tq alot for ur work",
  },
  {
    id: 3,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a-/ALV-UjVBr5MSPU_jD2xHjpMPEFcMlKZ85ONi64ThQZTOEKd_EnCXJLEDCQ=w90-h90-p-rp-mo-ba2-br100',
      width: 420,
      height: 420,
    },
    rating: 5.0,
    name: 'Anoopsameer Cheekatla',
    text: 'It was a nyc experience and I felt very happy with this and this makes my event very special and coming to quality it was very nice and good quality cup. They took good safety measures while delivering the product. And really it was an awesome experience for me. It made my day. I felt very happy with this which u delivered. Because of u I am able to send the gift. I can’t express my happiness in words. Thank you so much secretxpresso😍😍😍😍',
  },
  {
    id: 4,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a/ACg8ocKqiY_oiXc5W1iWZeBu50NSVeqwi2K3J3YSz-dbSZTiol8SbTtk=w90-h90-p-rp-mo-br100',
      width: 420,
      height: 420,
    },
    rating: 5.0,
    name: 'Ajay Makala',
    text: 'Innovative thoughts are rare. This is one of them. Best service. Appreciable work by all the members of the Secretxpresso team. If you want to gift your loved ones Secretxpresso is the best way. Best wishes to the whole team.',
  },
  {
    id: 5,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a-/ALV-UjV4vcBgk7GZQnF83DUOu1D3OO92cN6avnljng1jOVYSSXwZCZcM=w90-h90-p-rp-mo-br100',
      width: 420,
      height: 420,
    },
    rating: 5.0,
    name: 'Niharika M',
    text: "Good job guys!! I'm really impressed with your work... everything went very well!! Even I asked them to arrange some things at the end moment. You guys are too sweet. Continue...!!",
  },
  {
    id: 6,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a-/ALV-UjU5nrLxPOXhsjQeQWIB0q1JWGgoZXI97K03tWnDTEw8KAnW6eQJ=w90-h90-p-rp-mo-ba2-br100',
      width: 420,
      height: 420,
    },
    rating: 4.5,
    name: 'Sikha Sreelekha',
    text: 'A celebration is never complete without gratifying your dear ones with something sweet and special. To make sure that you have something truly fascinating, our secret expresso has come up with an online delivery . Now, you can easily convey your thought and get it delivered anywhere in rajahmundry and kakinada . Surpises have become a vital component of occasions, parties and celebrations. If you are unable to visit in this lockdown on special occasions, then you can still mark your presence by ordering and we will deliver online from any part of the rajahmundry Our passion and thoughts will surely win the heart of your loved ones. So, go ahead and suprise your loved one to bring a massive smile on the face of your loved ones......❤❤',
  },
  {
    id: 7,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a/ACg8ocJe8tBJhB-Q_UieOdAtoDYaVtdmxfGHp-VB3ZeCVNzc4we1yUrv=w90-h90-p-rp-mo-br100',
      width: 420,
      height: 420,
    },
    rating: 3.5,
    name: 'Vishnu Priya',
    text: 'Really loved their service their dedication towards work is so appreciable Their Ideas many options Talking very nicely with customers is so good A big thanks to sceret xpresso for making spl day more spl I personally recommend them my heart ful thanks to sceret xpresso',
  },
  {
    id: 8,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a-/ALV-UjXkKj4yZX8F4gbYKMuzUrhKPkEBk95aCfGjYE0NE5GS6vq2tFwY=w90-h90-p-rp-mo-br100', // default initial “S” avatar not available as a unique URL
      width: 420,
      height: 420,
    },
    rating: 4.5,
    name: 'Shyam Kiran Buddana',
    text: `Happy with the presentation of the team.👍
Team are very polite and conscious on the present situation. Dedicated work.
Can improvise more on the ideology .
Hopping more successful career ahead. 😊`,
  },
  {
    id: 9,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a-/ALV-UjXbZFErdDQ3K807vyED6Ool3n4-kyarkQ__uYaeGUbQUQ9TotjE=w90-h90-p-rp-mo-br100',
      width: 420,
      height: 420,
    },
    rating: 4.5,
    name: 'Pavan Srinivas',
    text: 'I ordered festival sweets from FestEve were absolutely delicious and fresh! Beautifully packaged and delivered on time. The authentic taste and variety brought festive vibes. Highly recommend FestEve for a delightful experience!',
  },
  {
    id: 10,
    avatar: {
      src: 'https://lh3.googleusercontent.com/a/ACg8ocL_Dl9REokufhXKpM2zCOZcCc5t22Nat4r60GzuQfIqxBvV_A=w72-h72-p-rp-mo-br100', // default initial "L" avatar not available as a unique URL
      width: 420,
      height: 420,
    },
    rating: 3.5,
    name: 'Lalitha Sivani',
    text: 'EXTREMELY IMPRESSED!! 🤩.  Everything went perfectly. Very honest, reliable, and timely. Excellent service, fast responses, everything as expected and very happy with surprises. I will certainly contact them for dealings in the future. Thank you SECRETXPRESSO',
  },
];

interface TestimonialsProps {
  sectionHeading: string;
  className?: string;
  type?: 'rounded' | 'circle' | 'list';
  disableBoarderRadius?: boolean;
  reduceCardSpacing?: boolean;
  demoVariant?: 'ancient';
}

const breakpoints = {
  '1720': {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  '1366': {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  '1025': {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 0,
  },
};

const TestimonialCarousel: React.FC<TestimonialsProps> = ({
  sectionHeading,
  className = 'mb-10 md:mb-12 xl:mb-14 md:pb-1 xl:pb-0',
  type,
  disableBoarderRadius = false,
  reduceCardSpacing = false,
  demoVariant,
}) => {
  return (
    <div
      className={`heightFull ${className} ${demoVariant === 'ancient' && 'ancient-testimonial'
        }`}
    >
      <SectionHeader sectionHeading={sectionHeading} />
      <Carousel
        autoplay={{
          delay: 4000,
        }}
        breakpoints={breakpoints}
        className={`testimonial-carousel ${reduceCardSpacing && 'reduce-child-padding'
          }`}
        scrollbar={{ draggable: true, hide: false }}
        {...(type === 'list'
          ? {
            buttonGroupClassName:
              '!w-auto !top-0 ltr:!right-6 rtl:!left-6 carousel-control',
            type: 'list',
            buttonSize: 'small',
            isFraction: true,
            paginationFractionId: 'testimonialPaginationFraction',
            pagination: {
              el: '#testimonialPaginationFraction',
              type: 'fraction',
              formatFractionCurrent: function (number: number) {
                return number;
              },
            },
            prevActivateId: 'prev',
            nextActivateId: 'next',
          }
          : {
            buttonGroupClassName: 'hidden',
          })}
      >
        {(demoVariant === 'ancient' ? testimonialsTwo : testimonials)?.map(
          (testimonial, id) => (
            <SwiperSlide key={`testimonial--key-${id}`}>
              <TestimonialCard
                demoVariant={demoVariant}
                item={testimonial}
                type="modern"
                disableBoarderRadius={disableBoarderRadius}
              />
            </SwiperSlide>
          )
        )}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
