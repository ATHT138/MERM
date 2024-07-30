import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import assert from "../../asserts";

const imageUrls = [
  assert.image.watch1,
  assert.image.watch2,
  assert.image.watch3,
  assert.image.watch4,
  assert.image.watch5,
  assert.image.watch6,
];

const About = () => {
  return (
    <section className="container p-8 bg-background">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-6xl font-bold text-primary">About Us</h2>
        <p className="w-3/5 mb-8 text-center text-muted-foregroun">
          At [Your Business Name], we are passionate about crafting exquisite
          timepieces that blend style, functionality, and precision. Our
          commitment is to deliver the finest quality watches that meet the
          highest standards of craftsmanship.
        </p>
      </div>
      <Carousel className="mb-10">
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="basis-1/3 lg:basis-1/3">
              <img
                src={url}
                alt={`Watch ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <Card className="p-6 rounded-lg shadow-md bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">
              Crafting Timeless Pieces
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 text-muted-foreground">
            At [Your Business Name], we combine tradition with innovation to
            create timepieces that are both elegant and functional. Each watch
            is a testament to our dedication to quality and craftsmanship.
          </CardContent>
        </Card>

        <Card className="p-6 rounded-lg shadow-md bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">
              Elevating Your Style
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 text-muted-foreground">
            "Elevate your style with our curated collection of luxury watches."
            - <strong>[Your Founder’s Name]</strong>
          </CardContent>
        </Card>
      </div>
      <Card className="p-6 rounded-lg shadow-md bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Innovation Meets Tradition
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-2 text-muted-foreground">
          Our watches are crafted using the latest technology while honoring
          traditional watchmaking techniques, ensuring both durability and
          timeless appeal.
        </CardContent>
      </Card>
    </section>
  );
};

export default About;
