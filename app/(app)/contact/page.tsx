import PageHeader from '@/components/PageHeader';
import { ContactForm } from './_components/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact" />

      <div className="flex justify-center mt-10 md:mt-0">
        <div className="w-[800px]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
