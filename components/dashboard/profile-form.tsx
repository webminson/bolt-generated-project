'use client';

    import * as React from 'react';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import * as z from 'zod';

    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from '@/components/ui/form';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { useToast } from '@/hooks/use-toast';
    import { supabase } from '@/lib/supabase/client';
    import { useRouter } from 'next/navigation';

    const profileFormSchema = z.object({
      name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
      }),
      sex: z.enum(['male', 'female', 'other'], {
        required_error: 'Please select your sex.',
      }),
      age: z.coerce.number().min(13, {
        message: 'You must be at least 13 years old.',
      }),
      schoolGrade: z.string().min(1, {
        message: 'Please select your school grade.',
      }),
      country: z.string().min(1, {
        message: 'Please select your country.',
      }),
    });

    type ProfileFormValues = z.infer<typeof profileFormSchema>;

    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
      { value: 'in', label: 'India' },
      { value: 'br', label: 'Brazil' },
    ];

    const schoolGrades = [
      { value: 'elementary', label: 'Elementary School' },
      { value: 'middle', label: 'Middle School' },
      { value: 'high', label: 'High School' },
      { value: 'college', label: 'College' },
      { value: 'university', label: 'University' },
      { value: 'other', label: 'Other' },
    ];

    export function ProfileForm() {
      const router = useRouter();
      const { toast } = useToast();
      const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
          name: '',
          sex: 'other',
          age: 13,
          schoolGrade: '',
          country: '',
        },
      });

      const onSubmit = async (data: ProfileFormValues) => {
        try {
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: (await supabase.auth.getUser()).data.user?.id,
              full_name: data.name,
              email: (await supabase.auth.getUser()).data.user?.email,
              education_level: data.schoolGrade,
              country: data.country,
            });

          if (error) throw error;

          toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
          });
          router.refresh();
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to update profile. Please try again.',
            variant: 'destructive',
          });
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Your age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolGrade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Grade</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your school grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {schoolGrades.map((grade) => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      );
    }
