using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webAppApi.Data;

namespace webAppApi.Services.FileService
{
    public interface IFileService
    {
        IEnumerable<File> GetAllFiles();
        File GetFile(string FileId);
        void InsertFile(File File);
        void UpdateFile(File File);
        void DeleteFile(string FileId);

    }
}
