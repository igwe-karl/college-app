import { Input } from "@/app/components/input";
import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen py-10 px-20">
      <div className="">
        <h1 className="text-2xl font-bold mt-10">Let&apos;s get in touch</h1>
        <div className="grid grid-cols-2 gap-10 mt-10 ">
          <div className="flex flex-col gap-8">
            <Input
              showIfValid={true}
              placeholder="Name"
              type="text"
              name="name"
            />
            <Input
              showIfValid={true}
              placeholder="Email"
              type="email"
              name="email"
            />
            <Input
              showIfValid={true}
              placeholder="Message"
              type="text"
              name="message"
            />
            <Input
              showIfValid={true}
              placeholder="Phone"
              type="text"
              name="phone"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-4 items-center">
              <Phone className="w-10 h-10" />
              <p> +234 803 928 6926</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <MapPin className="w-10 h-10" />
              <div className="flex flex-col gap-2">
                <p>
                  2 Jacob Nwazota street, peace estate, Gbagada, Lagos, Nigeria.
                  100234
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Mail className="w-10 h-10" />
              <p>crtafrica@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
