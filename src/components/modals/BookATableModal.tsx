import { ChangeEvent, Fragment, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { Stepper, Step } from "@material-tailwind/react";
import Button from "../ui/Button";
import { Restaurant } from "@prisma/client";
import { IRestarantSearch } from "../pages/Restaurants/RestaurantsSearch";
import Input from "../ui/Input";
const initialState = {
  numberOfHrs: 1,
  numberOfPeople: 1,
};

export default function BookATableModal({
  restaurant,
}: {
  restaurant: IRestarantSearch;
}) {
  const [form, setForm] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        className="!h-8 !py-1 py-2 !text-xs !capitalize"
      >
        book
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>book a table in {restaurant.name}</DialogHeader>

        <DialogBody divider>
          <div className="mx-auto flex w-full  flex-col gap-4 py-4">
            {activeStep == 0 && (
              <>
                <Input
                  placeholder="number of hours"
                  type="number"
                  name="numberOfHrs"
                  onChange={handleChange}
                  className="!h-12 rounded-lg "
                />
                <Input
                  placeholder="number of people"
                  type="number"
                  name="numberOfPeople"
                  onChange={handleChange}
                  className="!h-12 rounded-lg "
                />
              </>
            )}

            {activeStep == 1 && (
              <>
                <Select color="orange" label="payment method">
                  <Option>cash</Option>
                  <Option>crdit card </Option>
                  <Option>paypal</Option>
                </Select>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="w-full px-8 py-2">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              color="orange"
            >
              <Step onClick={() => setActiveStep(0)}>1</Step>
              <Step onClick={() => setActiveStep(1)}>2</Step>
              <Step onClick={() => setActiveStep(2)}>3</Step>
            </Stepper>
          </div>
          <div className="mt-10 flex items-center gap-2 ">
            <Button onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
