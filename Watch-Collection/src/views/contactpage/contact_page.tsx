import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from "@/components/ui";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactCard = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:m-20">
      <Card className="max-w-5xl p-4 mx-auto shadow-lg sm:p-6 lg:p-8">
        {isSubmitted ? (
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-bold sm:text-2xl lg:text-4xl text-foreground">
              Thank You!
            </h2>
            <BadgeCheck className="text-green-400 size-36" />
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground">
              Thank you for getting in touch with us. We will get back to you
              shortly.
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Back to Home
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="w-full text-xl font-bold text-center sm:text-2xl lg:text-4xl text-foreground">
                Get In Touch
              </CardTitle>
              <p className="hidden w-full mt-1 text-xs text-center sm:text-sm lg:text-base sm:w-3/5 text-muted-foreground sm:block">
                We’ll create high-quality linkable content and build at least 40
                high-authority links to each asset, paving the way for you to
                grow your rankings, improve brand.
              </p>
            </CardHeader>
            <CardContent className="mt-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 bg-gray-300 rounded-lg sm:p-6 ">
                  <h3 className="mb-2 text-lg font-semibold sm:text-xl lg:text-2xl text-secondary-foreground">
                    Contact Information
                  </h3>
                  <p className="mb-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    We’ll create high-quality linkable content and build at
                    least 40 high-authority.
                  </p>
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center gap-4">
                      <Phone />
                      <div>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                          +8801779717666
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                          +988678363686
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail />
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                        Support@gmail.com
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin />
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                        New York, USA
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-xs font-medium sm:text-sm text-foreground"
                        htmlFor="name"
                      >
                        Your Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="John Trangely"
                        className="text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-xs font-medium sm:text-sm text-foreground"
                        htmlFor="email"
                      >
                        Your Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="hello@nurency.com"
                        className="text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-xs font-medium sm:text-sm text-foreground"
                        htmlFor="subject"
                      >
                        Your Subject
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        placeholder="I want to hire you quickly"
                        className="text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-xs font-medium sm:text-sm text-foreground"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Write here your message"
                        className="text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default ContactCard;
