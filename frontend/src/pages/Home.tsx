import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Image,
  Select,
  SelectItem,
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
      <div className="flex items-center mt-3 pb-4 mb-5 border-b border-b-default-200 justify-between">
        <h1 className=" font-bold text-2xl ">All Products</h1>
        <Select label="Sort" size="sm" className="max-w-[11rem]">
          {sortOptions.map((val) => (
            <SelectItem key={val.name} value={val.name}>
              {val.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-4">
        <div className=" col-span-2 md:col-span-1">
          <Accordion>
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
          </Accordion>
        </div>
        <div className="col-span-3 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
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
