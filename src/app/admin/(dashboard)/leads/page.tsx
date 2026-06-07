import { Metadata } from 'next';
import { LeadsClient } from '@/components/admin/leads/LeadsClient';

export const metadata: Metadata = {
  title: 'Leads Management | TCI Express CRM',
  description: 'Manage and track customer leads.',
};

export default function LeadsPage() {
  return <LeadsClient />;
}