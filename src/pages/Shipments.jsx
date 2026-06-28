import React, { useState } from 'react';
import { Plus, Package, Truck, CheckCircle, MapPin, Clock } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import RowActions from '../components/common/RowActions';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from '../components/ui/sheet';
import { shipments } from '../data/operations';
import { formatDate } from '../utils/format';
import { toast } from 'sonner';

const timeline = [
  { status: 'Order Placed', date: 'Feb 07, 10:24 AM', completed: true, icon: Package },
  { status: 'Packed', date: 'Feb 07, 02:18 PM', completed: true, icon: Package },
  { status: 'Out for Delivery', date: 'Feb 08, 09:30 AM', completed: true, icon: Truck },
  { status: 'In Transit', date: 'Feb 08, 11:45 AM', completed: true, icon: MapPin },
  { status: 'Delivered', date: 'Pending', completed: false, icon: CheckCircle },
];

export default function Shipments() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleTrack = (s) => { setSelected(s); setOpen(true); };

  const columns = [
    { key: 'id', label: 'Shipment #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'invoiceRef', label: 'Invoice', render: (r) => <span className="font-mono text-xs">{r.invoiceRef}</span> },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium">{r.customer}</span> },
    { key: 'address', label: 'Delivery Address', render: (r) => <span className="text-xs text-gray-600">{r.address}</span> },
    { key: 'deliveryPerson', label: 'Driver' },
    { key: 'deliveryDate', label: 'Delivery Date', render: (r) => formatDate(r.deliveryDate) },
    { key: 'tracking', label: 'Tracking #', render: (r) => <span className="font-mono text-xs">{r.tracking}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => (
      <Button size="sm" variant="outline" className="h-7" onClick={() => handleTrack(r)} data-testid={`track-${r.id}`}>
        <MapPin className="w-3.5 h-3.5 mr-1" />Track
      </Button>
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipments & Delivery"
        subtitle="Manage deliveries, drivers and tracking"
        testIdPrefix="shipments"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="shipments-new-btn"><Plus className="w-4 h-4 mr-1.5" />New Shipment</Button>}
      />
      <DataTable
        testId="shipments-table"
        columns={columns}
        data={shipments}
        searchKeys={['id', 'customer', 'tracking', 'invoiceRef']}
        filters={[{ key: 'status', label: 'Status', options: ['Pending', 'Packed', 'Out for Delivery', 'Delivered', 'Returned', 'Cancelled'] }]}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="font-heading">Track Shipment</SheetTitle>
                <SheetDescription>
                  <span className="font-mono">{selected.tracking}</span>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Card className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wider text-blue-700 font-semibold">Current Status</p>
                  <p className="font-heading text-xl font-bold mt-1 text-blue-900">{selected.status}</p>
                  <p className="text-xs text-blue-700 mt-1">{selected.customer}</p>
                </Card>
                <div>
                  <h4 className="font-heading font-semibold text-sm mb-3">Timeline</h4>
                  <div className="space-y-0">
                    {timeline.map((t, i) => (
                      <div key={t.status} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            <t.icon className="w-4 h-4" />
                          </div>
                          {i < timeline.length - 1 && <div className={`w-0.5 h-10 ${t.completed ? 'bg-green-200' : 'bg-gray-200'}`} />}
                        </div>
                        <div className="pb-4 flex-1">
                          <div className={`text-sm font-medium ${t.completed ? 'text-gray-900' : 'text-gray-400'}`}>{t.status}</div>
                          <div className="text-xs text-gray-500">{t.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
