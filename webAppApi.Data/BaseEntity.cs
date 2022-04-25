using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webAppApi.Data
{
    public class BaseEntity
    {
        public string FileId { get; set; }
        public string name { get; set; }
        public string extension { get; set; }
        public DateTime createAt { get; set; }
        public string createBy { get; set; }
        public DateTime modifiedAt { get; set; }
        public string modifiedBy { get; set; }
    }
}
