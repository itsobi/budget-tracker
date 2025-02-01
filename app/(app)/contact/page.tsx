import PageHeader from '@/components/PageHeader';
import { ContactForm } from './_components/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact" />

      <div className="flex justify-center">
        <div className="w-[800px] pt-10 lg:pt-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
