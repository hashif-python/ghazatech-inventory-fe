import React from 'react';
import { Button } from '../ui/button';
import { MoreHorizontal, Eye, Edit, Trash2, Printer, Download, Copy } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from '../ui/dropdown-menu';

export const RowActions = ({ onView, onEdit, onDelete, onPrint, onDownload, onDuplicate, testId = 'row-actions' }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={testId}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {onView && <DropdownMenuItem onClick={onView}><Eye className="w-4 h-4 mr-2" />View</DropdownMenuItem>}
        {onEdit && <DropdownMenuItem onClick={onEdit}><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>}
        {onDuplicate && <DropdownMenuItem onClick={onDuplicate}><Copy className="w-4 h-4 mr-2" />Duplicate</DropdownMenuItem>}
        {onPrint && <DropdownMenuItem onClick={onPrint}><Printer className="w-4 h-4 mr-2" />Print</DropdownMenuItem>}
        {onDownload && <DropdownMenuItem onClick={onDownload}><Download className="w-4 h-4 mr-2" />Download</DropdownMenuItem>}
        {onDelete && <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-700"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
        </>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
