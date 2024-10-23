import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "How does the submission process work?",
    answer: "First you share your product details with us, and then we submit your product across all relevant platforms. The form to submit your product detail will be shared upon successful payment. The submission process will be completed within 7 days, after which we will share a submission report with you."
  },
  {
    question: "How can I get support? or provide feedback?",
    answer: 'Reach out to me on twitter (link in the footer)'
  }
];

export default function Faq() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-10 border-t border-gray-800"></div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h2 className="h2 mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-400">Got a question? We've got answers.</p>
      </div>

      <div className="w-full px-4 mb-10">
        <div className="mx-auto w-full max-w-3xl divide-y divide-white/5 rounded-xl bg-white/5">
          <div className="w-full px-4">
            {faqs.map((faq, index) => (
              <Disclosure as="div" className="p-6" defaultOpen={index === 0 } key={index}>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="font-medium text-white group-data-[hover]:text-white/80">
                    {faq.question}
                  </span>
                  <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-white/50">
                  {faq.answer}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}