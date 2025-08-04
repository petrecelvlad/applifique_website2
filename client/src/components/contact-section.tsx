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
    <section id="contact" className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-elegant-white border border-elegant-light-gray overflow-hidden"
        >
          <div className="lg:flex">
            {/* Content side */}
            <div className="lg:w-1/2 p-16">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-elegant-black mb-8 tracking-wide">
                  Join the Architecture
                </h2>
                <div className="w-16 h-px bg-elegant-black mb-8"></div>
                <p className="text-lg text-elegant-gray leading-relaxed font-light">
                  Be among the first to experience precision-engineered development planning.
                </p>
              </div>

              <div className="space-y-8 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-2 h-2 bg-elegant-black mt-3 flex-shrink-0"></div>
                    <p className="text-elegant-gray font-light leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:w-1/2 bg-elegant-black p-16 text-elegant-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <Label className="block text-sm font-light mb-3 text-elegant-light-gray tracking-wide">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-elegant-gray text-elegant-white placeholder-elegant-gray focus:outline-none focus:border-elegant-white transition-colors font-light"
                    required
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-light mb-3 text-elegant-light-gray tracking-wide">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-elegant-gray text-elegant-white placeholder-elegant-gray focus:outline-none focus:border-elegant-white transition-colors font-light"
                    required
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-light mb-3 text-elegant-light-gray tracking-wide">Application Type</Label>
                  <Select value={formData.appType || ""} onValueChange={(value) => handleInputChange('appType', value)}>
                    <SelectTrigger className="w-full px-0 py-3 bg-transparent border-0 border-b border-elegant-gray text-elegant-white focus:outline-none focus:border-elegant-white transition-colors">
                      <SelectValue placeholder="Select type..." />
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
                  <Label className="block text-sm font-light mb-3 text-elegant-light-gray tracking-wide">Project Description (Optional)</Label>
                  <Textarea
                    placeholder="Describe your vision..."
                    rows={3}
                    value={formData.description || ""}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-elegant-gray text-elegant-white placeholder-elegant-gray focus:outline-none focus:border-elegant-white transition-colors resize-none font-light"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={mutation.isPending || isSubmitted}
                  className="w-full bg-elegant-white text-elegant-black px-8 py-4 font-light tracking-wide hover:bg-elegant-light-gray transition-all border border-elegant-white disabled:opacity-70 disabled:cursor-not-allowed mt-12"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="mr-3 w-4 h-4" />
                      Submitted
                    </>
                  ) : mutation.isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-3 w-4 h-4 border border-elegant-black border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 w-4 h-4" />
                      Request Access
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-elegant-gray text-center font-light tracking-wide mt-8">
                  Confidential and secure. No unsolicited communications.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
