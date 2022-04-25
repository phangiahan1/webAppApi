using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webAppApi.Data;
using webAppApi.Repository.Repository;

namespace webAppApi.Services.FileService
{
    public class FileService : IFileService
    {
        private IRepository<File> _repository;
        public FileService(IRepository<File> repository)
        {
            _repository = repository;
        }
        public void DeleteFile(string FileId)
        {
            File file = GetFile(FileId);
            _repository.Remove(file);
            _repository.SaveChanges();
        }

        public IEnumerable<File> GetAllFiles()
        {
            return _repository.GetAll();
        }

        public File GetFile(string FileId)
        {
            return _repository.Get(FileId);
        }

        public void InsertFile(File File)
        {
            _repository.Insert(File);
        }

        public void UpdateFile(File File)
        {
            _repository.Update(File);
        }
    }
}
