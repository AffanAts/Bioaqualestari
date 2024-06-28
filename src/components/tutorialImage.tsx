import Image from 'next/image';

const TutorialGambar = () => {
  return (
    <div className="col-span-1 pt-5 md:pt-0">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <b>Tutorial mendapatkan Link URL gambar</b>
      </p>
      <ol className="text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside pt-2">
        <li>
          Kunjungi Website Berikut{' '}
          <a
            href="https://img.doerig.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Klik Disini
          </a>{' '}
        </li>
        <li>
          Klik &quot;Upload a file&quot; seperti pada gambar berikut
          <center>
            <div className="relative w-full h-56">
              <Image
                src="https://i.imgur.com/JcjYQZ6.jpeg"
                alt="Gambar"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </center>
        </li>
        <li>
          Pilihlah gambar yang ingin anda upload dan klik button &quot;upload&quot;
        </li>
        <li>
          Jika berhasil akan ada tulisan &quot;Success&quot; dan anda bisa menyalin link gambar tersebut
          <center>
            <div className="relative w-full h-80">
              <Image
                alt="Gambar"
                layout="fill"
                objectFit="contain"
                src="https://i.imgur.com/lndMtjB.jpeg"
              />
            </div>
          </center>
        </li>
      </ol>
    </div>
  );
};

export default TutorialGambar;
