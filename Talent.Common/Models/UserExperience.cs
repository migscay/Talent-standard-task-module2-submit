using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;
using Talent.Common.Contracts; //MOS24072021 added IMongoCommon for standard task module 1

namespace Talent.Common.Models
{
    public class UserExperience : IMongoCommon //MOS24072021 added IMongoCommon for standard task module 1
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; }
        public string UserId { get; set; } //MOS24072021 added for standard task module 1

        public String Company { get; set; }
        public String Position { get; set; }
        public String Responsibilities { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsDeleted { get; set; } //MOS24072021 added for standard task module 1

    }
}
