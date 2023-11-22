import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddLivestockData,
  useLivestock,
  useUpdateLivestockByID,
} from "@/pages/Livestock/hooks/useLivestockData";
import { useLivestockType } from "@/pages/Livestock/hooks/useLivestockTypeData";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  livestock_tag_no: z.string().min(1, { message: "Tag Number is required." }),
  livestock_colour: z.string().min(1, { message: "Color is required ." }),
  livestock_breed: z.string().min(1, { message: "Breed is required ." }),
  livestock_type: z.string({
    required_error: "Please select a Type.",
  }),
  livestock_gender: z.string().min(1, { message: "Gender is required ." }),
  livestock_details: z.string().optional(),
  dam_id: z.string().optional(),
});
type LivestockFormProps = {
  isUpdate: Boolean;
  submitBtnText: string;
};
function LivestockForm(props: LivestockFormProps) {
  //getting livestock_type data for form
  const l_type_Query = useLivestockType();
  const type = l_type_Query.data
    ? l_type_Query.data.map((item) => ({
        label: item.type,
        value: item.id,
      }))
    : [];
  //getting dam_id for form
  const dam_id_Query = useLivestock();
  const DamOptions = dam_id_Query.data
    ? dam_id_Query.data.map((item) => ({
        label: item.livestock_tag_no,
        value: item.id,
      }))
    : [];

  //getting current livestock data for update mode
  const { id } = useParams();
  const current_livestock: any = dam_id_Query.data
    ? dam_id_Query.data.find((item) => item.id === id)
    : [];
  const form = useForm<z.infer<typeof formSchema>>(
    props.isUpdate
      ? {
          defaultValues: current_livestock,
        }
      : {
          resolver: zodResolver(formSchema),
          defaultValues: {
            livestock_tag_no: "",
            livestock_colour: "",
            livestock_breed: "",
            livestock_details: "",
            livestock_gender: "male",
          },
        }
  );
  console.log(current_livestock);
  const { mutate: addLivestockData } = useAddLivestockData();
  const { mutate: updateLivestockData } = useUpdateLivestockByID();
  const onSubmitForm = (data: z.infer<typeof formSchema>) => {
    if (props.isUpdate && typeof id == "string") {
      const updatedLivestock = {
        // ...current_livestock,
        livestock_tag_no: data.livestock_tag_no,
        livestock_colour: data.livestock_colour,
        livestock_breed: data.livestock_breed,
        dam_id: data.dam_id,
        livestock_type: data.livestock_type,
        livestock_gender: data.livestock_gender,
        livestock_details: data.livestock_details,
      };
      // dispatch(updateLivestock(updatedLivestock))
      // console.log(updatedLivestock)
      // console.log("data",data)
      // console.log("current livestock,",current_livestock)
      console.log(updatedLivestock);
      updateLivestockData({ id: id, data: updatedLivestock });
    } else {
      addLivestockData(data);
      console.log("submit", data);
      // dispatch(addLivestock(data));
      form.reset();
      form.clearErrors();
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="livestock_tag_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag No</FormLabel>
              <FormControl>
                <Input placeholder="A001" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Tag Number for Livestock Indentification
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="livestock_colour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Brown" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Colour of livestock
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="livestock_breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormControl>
                <Input placeholder="Jersey" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Breed of Livestock
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="livestock_gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Gender of livestock
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="livestock_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input placeholder="Details..." {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Information related to livestock
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="livestock_type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Livestock Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? type.find((option) => option.value === field.value)
                            ?.label
                        : "Select Livestock Type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Livestock Type..." />
                    <CommandEmpty>No Livestock type found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72 w-48">
                        {type.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              form.setValue("livestock_type", option.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs">
                This is the type that will be used in the dashboard.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {DamOptions.length > 0 && (
          <FormField
            control={form.control}
            name="dam_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dam</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? DamOptions.find(
                              (dam_option) => dam_option.value === field.value
                            )?.label
                          : "Select Dam"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Dam ..." />
                      <CommandEmpty>No Dam found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-72 w-48">
                          {DamOptions.map((dam_option) => (
                            <CommandItem
                              value={dam_option.label}
                              key={dam_option.value}
                              onSelect={() => {
                                form.setValue("dam_id", dam_option.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  dam_option.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {dam_option.label}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">
                  This is the Dam that will be used in the dashboard.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}

        <Button type="submit">{props.submitBtnText}</Button>
        <Button variant="destructive" onClick={handleReset}>
          clear
        </Button>
      </form>
    </Form>
  );
}

export default LivestockForm;
