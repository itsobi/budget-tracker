import PageHeader from '@/components/PageHeader';
import { ContactForm } from './_components/ContactForm';

export default async function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact" />

      <div className="flex justify-center">
        <div className="w-[800px]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
