import React, { useState } from 'react';
import { Save, Building, Globe, CreditCard, Bell, Lock } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { toast } from 'sonner';

export default function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure company, taxation, branches and system preferences" testIdPrefix="settings" />

      <Tabs defaultValue="company">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="company" data-testid="tab-company"><Building className="w-3.5 h-3.5 mr-1" />Company</TabsTrigger>
          <TabsTrigger value="tax" data-testid="tab-tax"><CreditCard className="w-3.5 h-3.5 mr-1" />Tax & Currency</TabsTrigger>
          <TabsTrigger value="branches" data-testid="tab-branches"><Globe className="w-3.5 h-3.5 mr-1" />Branches</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications"><Bell className="w-3.5 h-3.5 mr-1" />Notifications</TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security"><Lock className="w-3.5 h-3.5 mr-1" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-4">
          <Card className="bg-white border border-gray-200/80 rounded-xl p-6 max-w-3xl">
            <h3 className="font-heading font-semibold mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Company Name</Label><Input defaultValue="GHAZA COMPUTER" className="mt-1" /></div>
              <div><Label>Trade License</Label><Input defaultValue="SHJ-786543" className="mt-1" /></div>
              <div><Label>TRN Number</Label><Input defaultValue="100456789000003" className="mt-1 font-mono" /></div>
              <div><Label>Industry</Label><Input defaultValue="Laptop Spare Parts Trading" className="mt-1" /></div>
              <div><Label>Phone</Label><Input defaultValue="+971 6 555 4433" className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" defaultValue="info@ghazacomputer.ae" className="mt-1" /></div>
              <div className="md:col-span-2"><Label>Head Office Address</Label>
                <Textarea defaultValue="Industrial Area 2, Sharjah, UAE" rows={2} className="mt-1" />
              </div>
              <div><Label>Website</Label><Input defaultValue="www.ghazacomputer.ae" className="mt-1" /></div>
              <div><Label>Established</Label><Input defaultValue="2015" className="mt-1" /></div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => toast.success('Company details saved')} className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="settings-company-save"><Save className="w-4 h-4 mr-1.5" />Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="mt-4">
          <Card className="bg-white border border-gray-200/80 rounded-xl p-6 max-w-3xl">
            <h3 className="font-heading font-semibold mb-4">Tax & Currency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Default Currency</Label>
                <Select defaultValue="AED">
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AED">AED — UAE Dirham</SelectItem>
                    <SelectItem value="USD">USD — US Dollar</SelectItem>
                    <SelectItem value="SAR">SAR — Saudi Riyal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>VAT Rate (%)</Label><Input type="number" defaultValue="5" className="mt-1" /></div>
              <div><Label>VAT Inclusive Pricing</Label>
                <div className="flex items-center gap-3 mt-2"><Switch defaultChecked id="vat-incl" /><Label htmlFor="vat-incl" className="text-sm text-gray-600">Display prices including VAT</Label></div>
              </div>
              <div><Label>Decimal Places</Label><Input type="number" defaultValue="2" className="mt-1" /></div>
              <div><Label>Invoice Prefix</Label><Input defaultValue="INV-2026-" className="mt-1 font-mono" /></div>
              <div><Label>Quotation Prefix</Label><Input defaultValue="QT-2026-" className="mt-1 font-mono" /></div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => toast.success('Tax settings saved')} className="bg-[#0B1F4D] hover:bg-[#071635]"><Save className="w-4 h-4 mr-1.5" />Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="mt-4">
          <Card className="bg-white border border-gray-200/80 rounded-xl p-6">
            <h3 className="font-heading font-semibold mb-4">Branch Management</h3>
            <p className="text-sm text-gray-500 mb-4">Configure individual branches, addresses and managers.</p>
            <div className="space-y-3">
              {['Main Branch – Sharjah Industrial Area 2', 'Dubai Branch – Bur Dubai', 'Deira Branch – Deira, Dubai', 'Abu Dhabi Branch – Musaffah', 'Ajman Branch – Ajman Industrial Area'].map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300">
                  <div>
                    <div className="font-medium text-sm">{b}</div>
                    <div className="text-xs text-gray-500">Manager: Ahmed Rashid · Active since Jan 2020</div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="bg-white border border-gray-200/80 rounded-xl p-6 max-w-3xl">
            <h3 className="font-heading font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                'Low stock alerts',
                'Visa / Emirates ID expiry alerts (30 days advance)',
                'Overdue invoice reminders',
                'Daily sales summary email',
                'Pending leave request notifications',
                'New customer payment alerts',
              ].map(label => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-gray-500">Email + In-app</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="bg-white border border-gray-200/80 rounded-xl p-6 max-w-3xl">
            <h3 className="font-heading font-semibold mb-4">Security & Access</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="text-sm font-medium">Two-factor authentication</div>
                  <div className="text-xs text-gray-500">Require OTP on every login</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="text-sm font-medium">Session timeout</div>
                  <div className="text-xs text-gray-500">Auto-logout after 30 minutes of inactivity</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium">IP whitelisting</div>
                  <div className="text-xs text-gray-500">Allow access only from specific IPs</div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
