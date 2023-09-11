import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Image,
  Select,
} from '@nextui-org/react';
import {
  brands,
  categories,
  colors,
  sortOptions,
} from '../../constants/sidebarConstants';
import { BiSolidStar } from 'react-icons/bi';
import { RxCross2, RxPlus } from 'react-icons/rx';
import { products } from '../../data.json';
function Home() {
  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl ">All Products</h1>
        <div>
          <Select label="Select an animal" className="max-w-xs">
            {sortOptions.map((val) => (
              <SelectItem key={val.name} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className=" col-span-1">
          <Accordion>
            <AccordionItem
              className="space-y-1"
              key="color"
              aria-label="Color"
              indicator={({ isOpen }) => (isOpen ? <RxCross2 /> : <RxPlus />)}
              title="Color"
            >
              {colors.map((val) => {
                return (
                  <Checkbox key={val.label} size="sm" className="block">
                    {val.label}
                  </Checkbox>
                );
              })}
            </AccordionItem>
            <AccordionItem
              className="space-y-1"
              key="categories"
              aria-label="Categories"
              indicator={({ isOpen }) => (isOpen ? <RxCross2 /> : <RxPlus />)}
              title="Categories"
            >
              {categories.map((val) => {
                return (
                  <Checkbox key={val.label} size="sm" className="block">
                    {val.label}
                  </Checkbox>
                );
              })}
            </AccordionItem>
            <AccordionItem
              className="space-y-1"
              key="brands"
              indicator={({ isOpen }) => (isOpen ? <RxCross2 /> : <RxPlus />)}
              aria-label="Brands"
              title="Brands"
            >
              {brands.map((val) => {
                return (
                  <Checkbox size="sm" className="block">
                    {val.label}
                  </Checkbox>
                );
              })}
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-3 place-items-center">
          {products.map((val) => {
            return (
              <Card className="h-[440px] hover:scale-[1.02] cursor-pointer hover:shadow-2xl flex flex-col">
                <CardHeader className="overflow-visible pb-2">
                  <Image
                    alt="Card background"
                    className="object-cover h-[320px] rounded-xl"
                    src={val.images[3]}
                    width={270}
                  />
                </CardHeader>
                <CardBody className="pb-0 justify-end pt-2 px-4 ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tiny uppercase font-bold">
                        {val.title}
                      </p>
                      <div className="flex items-center justify-start gap-2">
                        <BiSolidStar />
                        <h4 className="font-bold text-large">{val.rating}</h4>
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <small className="text-default-900 ">
                        $
                        {Math.round(
                          val.price * (1 - val.discountPercentage / 100)
                        )}
                      </small>
                      <small className="text-default-600 line-through">
                        ${val.price}
                      </small>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
