
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { GiHealthIncrease } from "react-icons/gi";
import useFetchCron from '../app/funct/useFetchCron';
import { useFormHandlers } from "../app/funct/useFormHandlers";
import useProfileData from '../app/funct/useFetchProfileData';

const Jadwal = () => {
  const { formData, handleNameChange, handleJamChange, handleMenitChange, handleSubmit, handleDelete } = useFormHandlers();
  const profile = useProfileData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { Cron, isLoading, isError } = useFetchCron(profile?.email || '');

  const hoursOptions = Array.from({ length: 24 }, (_, index) => index);
  const menitOptions = Array.from({ length: 60 }, (_, index) => index);

  if (!isClient) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isLoading) return <p className="container mx-auto px-4 py-8">Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card className='rounded-2xl shadow-2xl'>
            <CardHeader>
              <CardTitle>Form Jadwal</CardTitle>
              <CardDescription>
                <p className="text-sm mt-3">
                  Kelola Perawatan Anda dengan Mudah: Fitur Jadwal Obat
                  Jadwalkan dan Pantau Konsumsi Obat Anda dengan Lebih Efisien. Kesehatan Anda, Terjadwal dengan UPN Sehat!
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="namaObat">
                    Nama
                  </label>
                  <Input
                    id="namaObat"
                    type="text"
                    placeholder="Masukkan nama"
                    className="w-full"
                    value={formData.namaObat}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="jam">
                    Jam
                  </label>
                  <Select onValueChange={handleJamChange} defaultValue={formData.hoursTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jam" />
                    </SelectTrigger>
                    <SelectContent>
                      {hoursOptions.map(hour => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="menit">
                    Menit
                  </label>
                  <Select onValueChange={handleMenitChange} defaultValue={formData.minutesTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Menit" />
                    </SelectTrigger>
                    <SelectContent>
                      {menitOptions.map(menit => (
                        <SelectItem key={menit} value={menit.toString()}>
                          {menit.toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          {Cron.map((profile) => (
            <Card key={profile.id} className='mb-5 shadow-md'>
              <CardHeader className='flex justify-between'>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center">
                    <GiHealthIncrease className="mr-2 text-green-400" /> {profile.namaObat}
                  </div>
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(profile.namaObat, profile.email)}
                  >
                    Delete
                  </Button>
                </CardTitle>
                <CardDescription>
                  <p>{profile.email}</p>
                  {profile.Hours.map(hour => hour.time).join(' ; ')}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Jadwal;
