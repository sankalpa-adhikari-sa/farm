import { CheckIcon, PlusCircleIcon, ChevronsUpDown,Check } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"

import { Input } from "@/components/ui/input";

export default function ComboboxMulti() {
  const options = [
    { value: "One", label: "One" },
    { value: "Two", label: "Two" },
    { value: "Tree", label: "Tree" },
    { value: "Four", label: "Four" },
    { value: "Six", label: "Six" },
    { value: "Onee", label: "Onee" },
    { value: "Twoe", label: "Twoe" },
    { value: "Treee", label: "Treee" },
    { value: "Foure", label: "Foure" },
    { value: "Sixe", label: "Sixe" },
    { value: "Onea", label: "Onea" },
    { value: "Twoa", label: "Twoa" },
    { value: "Treea", label: "Treea" },
    { value: "Foura", label: "Foura" },
    { value: "Sixa", label: "Sixa" },
  ];
  const languages = [
    { value: "One", label: "One" },
    { value: "Two", label: "Two" },
    { value: "Tree", label: "Tree" },
    { value: "Four", label: "Four" },
    { value: "Six", label: "Six" },
    { value: "Onee", label: "Onee" },
    { value: "Twoe", label: "Twoe" },
    { value: "Treee", label: "Treee" },
    { value: "Foure", label: "Foure" },
    { value: "Sixe", label: "Sixe" },
    { value: "Onea", label: "Onea" },
    { value: "Twoa", label: "Twoa" },
    { value: "Treea", label: "Treea" },
    { value: "Foura", label: "Foura" },
    { value: "Sixa", label: "Sixa" },
  ];

  const selectedValues = new Set();

  const form = useForm({
    defaultValues:{
      livestock_tag_no:'',
    }
  });

  function onSubmit(data) {
    console.log(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='w-2/5'>
          <CardContent className='grid gap-4 pt-4'>
          <FormField  control={form.control}
        name="livestock_tag_no"
        rules={{
          required:"Livestock Tag Number is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Tag No</FormLabel>
            <FormControl>
              <Input placeholder="A001"
              {...field} />
            </FormControl>
            <FormDescription className="text-xs">
            Tag Number for Livestock Indentification
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>

            <FormField
              control={form.control}
              rules={{
                required:"At least 1 Number is required"            
             }}
              name='array_field'
              render={() => (
                <FormItem>
                  <FormLabel>Numbers</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                        >
                          <PlusCircleIcon className='mr-2 h-4 w-4' />
                          {(!selectedValues || selectedValues.size < 1)&& (<p className="text-muted-foreground">Numbers</p>)}
                          {selectedValues?.size > 0 && (
                            <>
                              <Separator
                                orientation='vertical'
                                className='mx-2 h-4'
                              />

                              <div className='flex space-x-1'>
                                
                                {selectedValues.size > 4 ? (
                                  <Badge
                                    variant='secondary'
                                    className='rounded-sm px-1 font-normal'
                                  >
                                    {selectedValues.size} selected
                                  </Badge>
                                ) : (
                                  options
                                    .filter((option) =>
                                      selectedValues.has(option.value),
                                    )
                                    .map((option) => (
                                      <Badge
                                        variant='secondary'
                                        key={option.value}
                                        className='rounded-sm px-1 font-normal'
                                      >
                                        {option.label}
                                      </Badge>
                                    ))
                                )}
                              </div>
                            </>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0' align='start'>
                      <Command>
                        <CommandInput
                          placeholder='Search array...'
                          className='h-9'
                        />
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 w-48">

                         
                          {options.map((option, index) => {
                            const isSelected = selectedValues.has(option.value);
                            return (
                              <CommandItem
                                key={index}
                                onSelect={() => {
                                  if (isSelected) {
                                    selectedValues.delete(option.value);
                                  } else {
                                    selectedValues.add(option.value);
                                  }
                                  const filterValues =
                                    Array.from(selectedValues);
                                  form.setValue("array_field", filterValues);
                                }}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible",
                                  )}
                                >
                                  <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                <span>{option.label}</span>
                              </CommandItem>
                            );
                          })}
                           </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
          control={form.control}
          name="language"
          rules={{
            required:"Language required"            
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
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
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                    <ScrollArea className="h-72 w-48">
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>

                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            

            <Button type='submit'>Submit</Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}