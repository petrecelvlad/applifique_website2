import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertWaitlistSignupSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertWaitlistSignupSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    appType: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });
      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", appType: "", description: "" });
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse(formData);
      mutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "Early access to all premium features",
    "Direct feedback channel to our development team",
    "Lifetime discount on future premium plans"
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blueprint-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="lg:flex">
            {/* Content side */}
            <div className="lg:w-1/2 p-12">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Blueprint Your Next App?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join our exclusive beta program and be among the first to experience the future of app development planning.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-6 h-6 bg-blueprint-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="text-white w-3 h-3" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blueprint-500 to-blueprint-600 p-12 text-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium mb-2 opacity-90">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium mb-2 opacity-90">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium mb-2 opacity-90">What type of app are you planning?</Label>
                  <Select value={formData.appType} onValueChange={(value) => handleInputChange('appType', value)}>
                    <SelectTrigger className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent">
                      <SelectValue placeholder="Select app type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Application</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="desktop">Desktop Software</SelectItem>
                      <SelectItem value="saas">SaaS Platform</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium mb-2 opacity-90">Tell us about your app idea (Optional)</Label>
                  <Textarea
                    placeholder="Briefly describe what you want to build..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={mutation.isPending || isSubmitted}
                  className="w-full bg-white text-blueprint-600 px-6 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="mr-3 w-5 h-5" />
                      Thank You!
                    </>
                  ) : mutation.isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-3 w-5 h-5 border-2 border-blueprint-600 border-t-transparent rounded-full"
                      />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 w-5 h-5" />
                      Join the Waitlist
                    </>
                  )}
                </Button>
                
                <p className="text-xs opacity-75 text-center">
                  We respect your privacy. No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
